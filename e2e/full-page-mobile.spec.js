import { test, expect, devices } from '@playwright/test';

// devices['iPhone 13'] includes `defaultBrowserType: 'webkit'`, a
// worker-scoped fixture. Worker-scoped fixtures can only be set with
// test.use() at the top level of a file (or in playwright.config.js), not
// inside a test.describe() block — Playwright throws a load-time error
// otherwise. Split into its own file so this test gets the real iPhone 13
// preset, unmodified, running on the actual WebKit engine (needed to catch
// mobile-Safari-specific WebGL/console errors from the hero canvas that
// Chromium's mobile emulation can't surface).
test.use({ ...devices['iPhone 13'] });

test.describe('mobile', () => {
  test('full page renders on a mobile viewport with no console errors', async ({
    page,
  }) => {
    const errors = [];
    page.on('pageerror', (err) => errors.push(err.message));
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });

    await page.goto('/');
    for (const id of ['#about', '#what-i-build', '#work', '#contact']) {
      await page.locator(id).scrollIntoViewIfNeeded();
      await page.waitForTimeout(400);
    }

    expect(errors).toEqual([]);
  });
});
