import { test, expect } from '@playwright/test';

test('shows the static fallback when reduced motion is preferred', async ({
  browser,
}) => {
  const context = await browser.newContext({ reducedMotion: 'reduce' });
  const page = await context.newPage();
  await page.goto('/');

  await expect(page.locator('.hero-static')).toBeVisible();
  await expect(page.locator('.hero-scene canvas')).toHaveCount(0);

  await context.close();
});

test('shows the WebGL scene when motion is not reduced', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.hero-scene canvas')).toBeVisible();
  await expect(page.locator('.hero-static')).toHaveCount(0);
});
