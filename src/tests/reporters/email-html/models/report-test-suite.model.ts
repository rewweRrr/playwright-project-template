import { ReportTestResult } from './report-test-result.model';

export interface ReportTestSuite {
    title: string;
    suites: ReportTestSuite[];
    tests: ReportTestResult[];
}
