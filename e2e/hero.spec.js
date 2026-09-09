import { test, expect } from '@playwright/test';

test('hero pins and the particle scene renders across the scroll sequence', async ({
  page,
}) => {
  const errors = [];
  page.on('pageerror', (err) => errors.push(err.message));

  await page.goto('/');
  await expect(page.locator('.hero-scene canvas')).toBeVisible();

  // Scroll partway into the pinned range and confirm the section is still pinned.
  await page.mouse.wheel(0, 800);
  await page.waitForTimeout(300);
  const heroBox = await page.locator('.hero-scene').boundingBox();
  expect(heroBox.y).toBeCloseTo(0, 0);

  // Scroll through the full pinned range; headline should end visible.
  await page.mouse.wheel(0, 4000);
  await page.waitForTimeout(2000);
  const opacity = await page
    .locator('.hero-content')
    .evaluate((el) => parseFloat(getComputedStyle(el).opacity));
  expect(opacity).toBeGreaterThan(0.5);

  expect(errors).toEqual([]);
});
