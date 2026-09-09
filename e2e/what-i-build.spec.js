import { test, expect } from '@playwright/test';

test('What I Build section shows all four capability cards', async ({ page }) => {
  await page.goto('/');
  await page.locator('#what-i-build').scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  const cards = page.locator('#what-i-build .capability-card');
  await expect(cards).toHaveCount(4);
  await expect(cards.nth(0)).toContainText('LEAD CAPTURE');
  await expect(cards.nth(3)).toContainText('REACTIVATION');
});
