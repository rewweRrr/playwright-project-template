import { test } from '@playwright/test';
import { MAIN_PAGE } from '@src/common/constants/page.constants';
import { checkMainPageHeading, checkMainPageTitle } from '@src/common/actions/main-page.actions';

test.describe.parallel('[Smoke] Main Page', () => {
    test('Text content present', async ({ page }) => {
        await page.goto(MAIN_PAGE);
        await checkMainPageTitle(page);
        await checkMainPageHeading(page);
    });
});
