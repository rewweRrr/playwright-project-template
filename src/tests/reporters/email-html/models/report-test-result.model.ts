import { TestError, TestStatus } from '@playwright/test/reporter';

export interface ReportTestResult {
    title: string;
    result?: TestStatus | 'flaky';
    errors?: TestError[];
}
