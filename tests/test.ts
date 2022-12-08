import { expect, test } from '@playwright/test';

test('home page has expected title', async ({ page }) => {
	await page.goto('/');
	expect(await page.textContent('section')).toContain('STRØMMING');
});
