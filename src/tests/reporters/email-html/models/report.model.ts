import { ReportTestSuite } from './report-test-suite.model';
import { TestNumbers } from './test-numbers.model';

export interface Report {
    status: string;
    testNumbers: TestNumbers;
    suites: ReportTestSuite[];
}
