import { FullConfig, FullResult, Reporter, Suite, TestCase, TestResult } from '@playwright/test/reporter';
import ejs from 'ejs';
import fs from 'fs';
import path from 'path';
import { ReportTestResult } from './models/report-test-result.model';
import { ReportTestSuite } from './models/report-test-suite.model';
import { Report } from './models/report.model';

export default class EmailHtmlReporter implements Reporter {
    report: Report = {
        status: '',
        testNumbers: {
            total: 0,
            passed: 0,
            failed: 0,
            flaky: 0,
            skipped: 0,
            timedOut: 0,
        },
        suites: [],
    };

    retries = 0;

    onBegin(_config: FullConfig<{}, {}>, suite: Suite): void {
        this.report.suites = suite.suites.map(s => this.createReportSuite(s));
    }

    onTestEnd(test: TestCase, result: TestResult): void {
        const titlePath = test.titlePath();
        titlePath.splice(0, 1);

        let foundTest: ReportTestResult | undefined = undefined;
        let searchContext: { tests?: ReportTestResult[]; suites: ReportTestSuite[] } | null = this.report;

        titlePath.forEach((title, index) => {
            if (!searchContext) {
                return;
            }

            if (index + 1 < titlePath.length) {
                searchContext = searchContext.suites.find(s => s.title === title);
                return;
            }

            foundTest = searchContext.tests?.find(t => t.title === title);
        });

        if (foundTest) {
            const allowedRetries = test.parent.project().retries;
            foundTest.result = result.status === 'passed' && result.retry > 0 ? 'flaky' : result.status;
            foundTest.errors = result.errors;

            if (foundTest.result !== 'failed' || result.retry >= allowedRetries) {
                this.report.testNumbers.total++;
                this.report.testNumbers[foundTest.result]++;
            }
        }
    }

    async onEnd(result: FullResult): Promise<void> {
        this.report.status = result.status;

        const templatePath = path.resolve(__dirname, 'templates/email-report.ejs');
        const reportFolder = path.resolve(process.cwd(), 'email-report');
        const reportHtml = await ejs.renderFile(templatePath, this.report);
        fs.mkdirSync(reportFolder, {
            recursive: true,
        });
        fs.writeFileSync(reportFolder + '/report.html', reportHtml, {
            encoding: 'utf-8',
        });
    }

    private createReportSuite(suite: Suite): ReportTestSuite {
        return {
            title: suite.title,
            tests: suite.tests.map(test => ({
                title: test.title,
            })),
            suites: suite.suites.map(s => this.createReportSuite(s)),
        };
    }
}
