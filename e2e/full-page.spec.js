import { test, expect } from '@playwright/test';

test.describe('desktop', () => {
  test('full page scrolls through all sections with no console errors', async ({
    page,
  }) => {
    const errors = [];
    page.on('pageerror', (err) => errors.push(err.message));
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/');

    for (const id of ['#about', '#what-i-build', '#work', '#contact']) {
      await page.locator(id).scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
    }

    expect(errors).toEqual([]);
  });
});
