import { expect, Page } from '@playwright/test';

export async function checkMainPageTitle(page: Page) {
    await expect(page.getByText('{JSON} Placeholder', { exact: true })).toBeVisible();
}

export async function checkMainPageHeading(page: Page) {
    await expect(page.getByRole('heading', { name: 'Free fake API for testing and prototyping.' })).toBeVisible();
}
