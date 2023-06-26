import 'dotenv/config';
import { PlaywrightTestConfig, devices } from '@playwright/test';

const isCI = !!process.env.CI;

const config: PlaywrightTestConfig = {
    testDir: './src/tests',
    testMatch: /.*\.(smoke|regression|e2e)\.ts$/,
    timeout: 5 * 60 * 1000,
    retries: 1,
    reportSlowTests: null,
    forbidOnly: isCI,
    expect: {
        timeout: 30 * 1000,
    },
    use: {
        ignoreHTTPSErrors: true,
        trace: 'retain-on-failure',
        actionTimeout: 30 * 1000,
        permissions: [],
    },
    reporter: isCI
        ? [['dot'], ['html', { open: 'never' }], ['./src/tests/reporters/email-html/email-html.reporter.ts']]
        : [['line'], ['html', { open: 'never' }]],
    projects: [
        {
            name: 'chrome:mobile',
            use: {
                ...devices['Pixel 5'],
            },
        },
        {
            name: 'firefox:mobile',
            use: {
                ...devices['Desktop Firefox'],
                viewport: {
                    width: 393,
                    height: 727,
                },
                deviceScaleFactor: 2.75,
            },
        },
        {
            name: 'safari:mobile',
            use: {
                ...devices['iPhone 13'],
            },
        },
    ],
};

if (isCI && !process.env.CI_ENABLE_WEBKIT) {
    config.projects = config.projects.filter(p => p.name !== 'safari:mobile');
}

export default config;
