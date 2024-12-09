import { faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";
const { username, password } = require("../fixtures/fixtures");

test("01 Should take a screenshot of registration page", async ({ page }) => {
  await page.goto("/registrace");
  await page.screenshot({ path: "PrvniScreenshot.png", fullPage: true });

  const regName = page.locator("input#name");
  await regName.screenshot({ path: "regName.png" });

  const regEmail = page.getByLabel("email");
  await regEmail.screenshot({ path: "regEmail.png" });

  const regPassword = page.locator("input#password");
  await regPassword.screenshot({ path: "regPassword.png" });

  const confirmPassword = page.getByLabel("Kontrola hesla");
  await confirmPassword.screenshot({ path: "confirmPassword.png" });

  const registerButton = page.getByText("Zaregistrovat");
  await registerButton.screenshot({ path: "registerButton.png" });
});

test("02 Should find locator for each button", async ({ page }) => {
  await page.goto("/registrace");

  const h1Locator = page.locator("h1");
  const regName = page.locator("input#name"); // Name and Surname by tag and ID
  await regName.screenshot({ path: "regName.png" });

  const regEmail = page.locator('input[type="email"]'); // Email by tag and atribute
  await regEmail.screenshot({ path: "regEmail.png" });

  const regPassword = page.locator("input#password"); // PSWD field by tag and ID
  await regPassword.screenshot({ path: "regPassword.png" });

  const confirmPassword = page.getByLabel("Kontrola hesla"); // Repeat PSWD by label
  await confirmPassword.screenshot({ path: "confirmPassword.png" });

  const registerButton = page.locator(".btn-primary"); // Button by css class
  await registerButton.screenshot({ path: "registerButton.png" });
});

test("03 Should fill in registration form", async ({ page }) => {
  await page.goto("/registrace");
  const regUserName = page.locator("input#name");
  const regEmail = page.locator("input#email");
  const regPassword = page.locator("input#password");
  const regPasswordConfirm = page.locator("input#password-confirm");

  await regUserName.fill("Sarka D");
  await regEmail.fill("korci@centrum.cz");
  await regPassword.fill("czechitas");
  await regPasswordConfirm.fill("czechitas");
  await page.locator(".btn-primary").click();
  await page.screenshot({ path: "registrationScreenshot.png", fullPage: true });
});

test("04-01 Registration of new user", async ({ page }) => {
  await page.goto("/registrace");
  const regUserName = page.locator("input#name");
  const regEmail = page.locator("input#email");
  const regPassword = page.locator("input#password");
  const regPasswordConfirm = page.locator("input#password-confirm");
  const fakeEmail = faker.internet.email();

  await regUserName.fill("Sarka D");
  await regEmail.fill(fakeEmail);
  await regPassword.fill("Czechitas123");
  await regPasswordConfirm.fill("Czechitas123");
  await page.locator(".btn-primary").click();

  const registeredUserName = page
    .locator("div")
    .locator(".navbar-right")
    .locator("strong");
  await expect(registeredUserName).toHaveText("Sarka D");
});

test("04-02 Registration with an existing email address", async ({ page }) => {
  await page.goto("/registrace");
  const regUserName = page.locator("input#name");
  const regEmail = page.locator("input#email");
  const regPassword = page.locator("input#password");
  const regPasswordConfirm = page.locator("input#password-confirm");

  await regUserName.fill("Sarka D");
  await regEmail.fill("korci@centrum.cz");
  await regPassword.fill("Czechitas123");
  await regPasswordConfirm.fill("Czechitas123");
  await page.locator(".btn-primary").click();

  const registeredUserName = page
    .locator("div")
    .locator(".navbar-right")
    .locator("strong");
  await expect(registeredUserName).not.toBeAttached;

  const registrationError = page.locator(".invalid-feedback").locator("strong");
  await expect(registrationError).toBeAttached();
});

// refactored homework

async function goToRegistrationPage(page) {
  await page.goto("/registrace");
}

test.describe("Registration", () => {
  test.beforeEach("001 - Registration form validation", async ({ page }) => {
    await goToRegistrationPage(page);

    const regUserName = page.locator("input#name");
    const regEmail = page.locator("input#email");
    const regPassword = page.locator("input#password");
    const regPasswordConfirm = page.locator("input#password-confirm");
    const registerButton = page.locator(".btn-primary");

    await page.getByText("Registrace").toBeAttached;
    await regUserName.toBeEditable;
    await regEmail.waitFor({ state: "visible" });
    await expect(regPassword).toBeAttached({ attached: true });
    await expect(regPasswordConfirm).toBeAttached();
  });

  test("002 - New Registration", async ({ page }) => {
    const regUserName = page.locator("input#name");
    const regEmail = page.locator("input#email");
    const regPassword = page.locator("input#password");
    const regPasswordConfirm = page.locator("input#password-confirm");
    const registerButton = page.locator(".btn-primary");
    const fakeEmail = faker.internet.email();

    await test.step("Registering new user", async () => {
      await goToRegistrationPage(page);

      await regUserName.fill("Sarka D");
      await regEmail.fill(fakeEmail);

      await regPassword.fill("Czechitas123");
      await regPasswordConfirm.fill("Czechitas123");
      await page.locator(".btn-primary").click();
      await page.screenshot({
        path: "registrationScreenshot.png",
        fullPage: true,
      });
    });

    const registeredUserName = page
      .locator("div")
      .locator(".navbar-right")
      .locator("span");
    await expect(registeredUserName).toHaveText("Přihlášen");
  });
});

test.describe("Register new user - Negative scenario", () => {
  test.beforeEach(async ({ page }) => {
    await goToRegistrationPage(page);
  });

  test("003 - Register with an existing email address", async ({ page }) => {
    const regUserName = page.locator("input#name");
    const regEmail = page.locator("input#email");
    const regPassword = page.locator("input#password");
    const regPasswordConfirm = page.locator("input#password-confirm");
    const registerButton = page.locator(".btn-primary");

    await test.step("Fills in user's data and existing email", async () => {
      await regUserName.fill("Sarka D");
      await regEmail.click();
      await regEmail.fill(username);
      await regPassword.fill("Czechitas123");
      await regPasswordConfirm.fill("Czechitas123");
      await page.locator(".btn-primary").click();
      await page.screenshot({
        path: "registrationInvalidScreenshot.png",
        fullPage: true,
      });
    });
  });

  test("004 - Register with weak password", async ({ page }) => {
    const regUserName = page.locator("input#name");
    const regEmail = page.locator("input#email");
    const regPassword = page.locator("input#password");
    const regPasswordConfirm = page.locator("input#password-confirm");
    const registerButton = page.locator(".btn-primary");

    await test.step("Fills in user's data and existing email", async () => {
      await regUserName.fill("Sarka D");
      await regEmail.click();
      await regEmail.fill(username);
      await regPassword.fill("123");
      await regPasswordConfirm.fill("123");
      await page.locator(".btn-primary").click();
      //TODO: Zde by se mi spis libil expect, aby to primo zkontrolovalo ocekavany obrazek
      // tzn. await expect(page).toHaveScreenshot('registrationInvalidPasswordScreenshot.png', {fullPage: true})

      await page.screenshot({
        path: "registrationInvalidPasswordScreenshot.png",
        fullPage: true,
      });
    });
    // TODO - Stejny komentar jako vyse
    await test.step("Writes error messages to console", async () => {
      for (const row of await page.locator(".invalid-feedback").all())
        console.log(await row.textContent());
    });
  });
});
