
import { test, expect } from '../fixtures/auth.fixture';

test('Navbar is displayed correctly', async ({ authenticatedPage }) => {
  await expect(
    authenticatedPage.locator('.oxd-topbar-header-hamburger')
  ).toBeVisible();

  await expect(
    authenticatedPage.getByRole('img', { name: 'profile picture' })
  ).toBeVisible();
});