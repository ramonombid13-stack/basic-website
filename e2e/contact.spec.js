import { test, expect } from '@playwright/test';

test('Contact section renders a working mailto link', async ({ page }) => {
  await page.goto('/');
  await page.locator('#contact').scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  const link = page.locator('#contact a.btn-solid');
  await expect(link).toHaveText('Email me');
  await expect(link).toHaveAttribute('href', 'mailto:you@example.com');
});
