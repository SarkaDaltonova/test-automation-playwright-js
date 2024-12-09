import { expect, test } from "@playwright/test";
import { LoginPage } from "./login.page.js";
const { username, password } = require("./fixtures.js");

test.describe("Login - valid & invalid", () => {
  test("08 - Login ", async ({ page }) => {
    test.setTimeout(10 * 1000);

    const loginPage = new LoginPage(page);
    await loginPage.open();

    console.log(
      "Email field is editable " +
        (await loginPage.emailFieldLocator.isEnabled())
    );
    console.log(
      "Password field is visible " +
        (await loginPage.passwordFieldLocator.isVisible())
    );

    await loginPage.login(username, password);

    // pokus //

    await expect(loginPage.registeredUserName).toHaveText("Přihlášen");
    console.log("User is logged in");
  });

  test("08-02 - Logout ", async ({ page }) => {
    await loginPage.login(username, "invalid");

    const loginPage = new LoginPage(page);
  });

  // login jinak, voláním z fuknce //

  test("08-03 - Invalid login ", async ({ page }) => {
    await loginPage.login(username, "invalid");

    const loginPage = new LoginPage(page);
  });
});
