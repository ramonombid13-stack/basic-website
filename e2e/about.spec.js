import { test, expect } from '@playwright/test';

test('About section renders content and reveals on scroll', async ({ page }) => {
  await page.goto('/');
  await page.locator('#about').scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  await expect(page.locator('#about h2')).toContainText(
    'A decade inside other people’s systems'
  );
  const opacity = await page
    .locator('#about .about-grid')
    .evaluate((el) => parseFloat(getComputedStyle(el).opacity));
  expect(opacity).toBeGreaterThan(0.9);
});
