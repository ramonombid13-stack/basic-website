import { test, expect, devices } from '@playwright/test';

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

test.describe('mobile', () => {
  // devices['iPhone 13'] includes `defaultBrowserType: 'webkit'`, which is a
  // worker-scoped fixture and cannot be overridden inside a describe block
  // (Playwright throws "Cannot use({ defaultBrowserType }) in a describe
  // group" at load time). Strip it so only the context-scoped emulation
  // (viewport, userAgent, isMobile, hasTouch, deviceScaleFactor) applies,
  // keeping this test on the suite's default chromium project.
  const { defaultBrowserType, ...iPhone13 } = devices['iPhone 13'];
  test.use({ ...iPhone13 });

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
