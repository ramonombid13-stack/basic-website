import { test, expect } from '@playwright/test';

test('page loads with dark background and identity mark', async ({ page }) => {
  await page.goto('/');
  const bg = await page.evaluate(
    () => getComputedStyle(document.body).backgroundColor
  );
  expect(bg).toBe('rgb(15, 14, 20)'); // #0f0e14
  await expect(page.locator('.site-mark')).toHaveText('Ramon Ombid');
});
