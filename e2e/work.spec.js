import { test, expect } from '@playwright/test';

test('Selected Work section shows exactly the 3 verified case studies', async ({
  page,
}) => {
  await page.goto('/');
  await page.locator('#work').scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);

  const cards = page.locator('#work .work-card');
  await expect(cards).toHaveCount(3);
  await expect(cards.nth(0)).toContainText('ELE INSURANCE');
  await expect(cards.nth(1)).toContainText('TINKERTRIBE');
  await expect(cards.nth(2)).toContainText('29:11 DENTAL CLINIC');

  for (const img of await page.locator('#work .work-image').all()) {
    await expect(img).toBeVisible();
  }
});
