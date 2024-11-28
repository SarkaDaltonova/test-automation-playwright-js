import { test } from "@playwright/test";
import { LoginPage } from "./login.page.js";

test("08 - Login ", async ({ page }) => {
  test.setTimeout(2 * 1000);

  const loginPage = new LoginPage(page);
  await loginPage.open();
  await loginPage.login(username, password);

  await loginPage.open();
  const loginEmail = page.locator("input#email");
  const loginPassword = page.locator("input#password");

  console.log("Email field is editable " + (await loginEmail.isEnabled()));
  console.log("Password field is visible " + (await loginPassword.isVisible()));

  const loginButton = page.locator(".btn-primary");
  console.log("Text at Login button is:" + (await loginButton.textContent()));
  const forgottenPassword = page.getByRole("link", {
    name: "Zapomněli jste své heslo?",
  });
});
