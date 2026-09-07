import { test, expect } from '@playwright/test';

test('Lenis is initialized on page load', async ({ page }) => {
  await page.goto('/');
  const hasLenis = await page.evaluate(() => typeof window.__lenis === 'object');
  expect(hasLenis).toBe(true);
});
