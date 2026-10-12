
import { test as base, expect, type Page } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { users } from '../test-data/users';

type AuthFixtures = {
  authenticatedPage: Page;
};

export const test = base.extend<AuthFixtures>({
  authenticatedPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);

    await loginPage.goto();
    await loginPage.login(
      users.validUser.username,
      users.validUser.password
    );

    // Confirm that login succeeded before the test continues.
    await expect(page).toHaveURL(/\/dashboard\/?$/);

    await use(page);
  },
});

export { expect };