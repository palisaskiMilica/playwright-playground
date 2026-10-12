import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { users } from '../test-data/users';

test('Login page is displayed correctly', async ({ page }) => {
  await page.goto('/web/index.php/auth/login');

  await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
  await expect(page.getByPlaceholder('Username')).toBeVisible();
  await expect(page.getByPlaceholder('Password')).toBeVisible();
  await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
});

test('User can login with valid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(
    users.validUser.username,
    users.validUser.password
  );

  await expect(page).toHaveURL(/dashboard/);
  await expect(
    page.getByRole('heading', { name: 'Dashboard' })
  ).toBeVisible();
});

test('User cannot login with invalid credentials', async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.login(
    users.invalidUser.username,
    users.invalidUser.password
  );

  await expect(
    page.getByText('Invalid credentials')
  ).toBeVisible();
});

test('Logout', async ({ page }) => {
  await page.goto('/web/index.php/auth/login');

  await page.getByPlaceholder('Username').fill('Admin');
  await page.getByPlaceholder('Password').fill('admin123');
  await page.getByRole('button', { name: 'Login' }).click();

  // FIX: Ensure dashboard finishes loading before clicking the dropdown icon
  await expect(page).toHaveURL(/.*dashboard/);

  // Clicks the dropdown arrow
  await page.locator('.oxd-userdropdown-icon').click();
  await page.getByRole('menuitem', { name: 'Logout' }).click();

  await expect(page).toHaveURL(/.*auth\/login/);
  await expect(page.getByPlaceholder('Username')).toBeVisible();
});
