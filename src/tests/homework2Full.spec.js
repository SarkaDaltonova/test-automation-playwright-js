import { faker } from "@faker-js/faker";
import { expect, test } from "@playwright/test";
import { addDays, format } from "date-fns";

import {
  address,
  client,
  contactName,
  contactPhone,
  ico,
  password,
  startDate,
  substitute,
  username,
} from "../fixtures/fixtures2";

async function goToLoginPage(page) {
  await page.goto("/prihlaseni");
}
async function clickToCreateOrder(page) {
  await page.getByRole("button", { name: "Uložit objednávku" }).click();
}

async function verifyHeadingNotVisible(page) {
  await expect(
    page.getByRole("heading", { name: "Děkujeme za objednávku" })
  ).not.toBeVisible();
}

function getFormattedStartDate() {
  return format(new Date(), "yyyy-MM-dd");
}

function getFormattedEndDate(daysToAdd = 1) {
  const endDate = addDays(new Date(), daysToAdd);
  return format(endDate, "dd.MM.yyyy");
}

test.describe("Order form link validation before each test", () => {
  async function openHomePage(page) {
    await page.goto("/");
  }
  // Order form fields
  function orderFormIcoLocator(page) {
    return page.locator("input#ico");
  }

  function orderFormClientLocator(page) {
    // return page.locator("input#client");
    return page.getByLabel("Odběratel");
  }

  function orderFormAddressLocator(page) {
    return page.locator("input#address");
  }

  function orderFormSubstituteLocator(page) {
    return page.locator("input#substitute");
  }

  function orderFormNameLocator(page) {
    return page.locator("input#contact_name");
  }

  function orderFormPhoneLocator(page) {
    return page.locator("input#contact_tel");
  }

  function orderFormMailLocator(page) {
    return page.locator("input#contact_mail");
  }

  function orderFormStartDateLocator(page) {
    return page.locator("input#start_date_1");
  }

  function orderFormEndDateLocator(page) {
    return page.locator("input#end_date_1");
  }

  function orderFormDayCampTabLocator(page) {
    return page.getByRole("tab", {
      name: "Příměstský tábor",
    });
  }

  test.beforeEach(async ({ page }) => {
    await openHomePage(page);
    await page.getByText("Pro učitelé").click();
    await expect(page.getByText("Objednávka pro MŠ/ZŠ")).toBeAttached();
    await page.getByRole("link", { name: "Objednávka pro MŠ/ZŠ" }).click();
    await expect(
      page.getByRole("heading", { name: "Objednávka akce" })
    ).toBeVisible();
  });

  test("01 Should verify the visibility of the order form", async ({
    page,
  }) => {
    await test.step("Order form fields validation - initial load", async () => {
      // order form fields
      const orderFormIco = orderFormIcoLocator(page);
      const orderFormClient = orderFormClientLocator(page);
      const orderFormAddress = orderFormAddressLocator(page);
      const orderFormSubstitute = orderFormSubstituteLocator(page);
      const orderFormName = orderFormNameLocator(page);
      const orderFormPhone = orderFormPhoneLocator(page);
      const orderFormEmail = orderFormMailLocator(page);
      const orderFormStartDate = orderFormStartDateLocator(page);
      const orderFormEndDate = orderFormEndDateLocator(page);
      const orderFormDayCamp = orderFormDayCampTabLocator(page);

      await expect(orderFormIco).toBeEditable();
      await expect(orderFormClient).toBeEditable();
      await expect(orderFormAddress).toBeEditable();
      await expect(orderFormSubstitute).toBeEditable();
      await expect(orderFormName).toBeEditable();
      await expect(orderFormPhone).toBeEditable();
      await expect(orderFormEmail).toBeEditable();
      await expect(orderFormStartDate).toBeEditable();
      await expect(orderFormEndDate).toBeEditable();
      await expect(orderFormName).toBeEditable();
      await expect(orderFormDayCamp).toBeAttached();

      await orderFormDayCamp.click();
      await expect(
        page.getByRole("button", { name: "Uložit objednávku" })
      ).toBeVisible();
    });

    await test.step("Order form fields validation - secondary fields", async () => {
      // Day camp fields
      const orderFormDayCamp = orderFormDayCampTabLocator(page);
      const selectElement = page.locator("#camp-date_part");
      const orderFormDayCampChildren = page.getByRole("spinbutton", {
        name: "Počet dětí",
      });
      const orderFormDayCampChildAge = page.getByRole("textbox", {
        name: "ve věku",
      });
      const orderFormDayCampAdults = page.getByRole("spinbutton", {
        name: "Počet pedagogického doprovodu",
      });

      await expect(selectElement).toBeVisible();

      await expect(orderFormDayCampChildren).toBeEditable();
      await expect(orderFormDayCampChildAge).toBeEditable();
      await expect(orderFormDayCampAdults).toBeEditable();

      await orderFormDayCamp.click();
      await page.getByRole("button", { name: "Uložit objednávku" }).click();
    });
  });

  test("03 Should create an order ", async ({ page }) => {
    const fakeEmail = faker.internet.email();

    await test.step("Filling in and sending the order form", async () => {
      const orderFormIco = orderFormIcoLocator(page);
      const orderFormClient = orderFormClientLocator(page);
      const orderFormAddress = orderFormAddressLocator(page);
      const orderFormSubstitute = orderFormSubstituteLocator(page);
      const orderFormName = orderFormNameLocator(page);
      const orderFormPhone = orderFormPhoneLocator(page);
      const orderFormEmail = orderFormMailLocator(page);
      const orderFormStartDate = orderFormStartDateLocator(page);
      const orderFormEndDate = orderFormEndDateLocator(page);
      const orderFormDayCamp = orderFormDayCampTabLocator(page);

      await orderFormIco.fill(ico);
      await page.locator("div.toast-message").waitFor({ state: "detached" });

      const startDate = getFormattedStartDate();
      const endDate = getFormattedEndDate();

      await orderFormSubstitute.fill(substitute);
      await orderFormName.fill(contactName);
      await orderFormPhone.fill(contactPhone);
      await orderFormEmail.fill(fakeEmail);
      await orderFormStartDate.fill(startDate);
      await orderFormEndDate.fill(endDate);

      await orderFormClient.fill(client); // I had to move it here otherwise the client was not filled in properly
      await orderFormAddress.fill(address);

      await orderFormDayCamp.click();

      await expect(page.locator("#camp-students")).toBeAttached;
      await page.locator("#camp-students").fill("2");

      await page.getByRole("textbox", { name: "ve věku" }).fill("3 a 5 let");

      await page
        .getByRole("spinbutton", { name: "Počet pedagogického doprovodu" })
        .fill("1");

      await page.getByRole("button", { name: "Uložit objednávku" }).click();
      await page.screenshot({ path: "OrderConfirmation1.png", fullPage: true });

      await expect(
        page.getByRole("heading", { name: "Děkujeme za objednávku" })
      ).toBeVisible();
    });

    await test.step("Should check the created order in the system", async () => {
      await goToLoginPage(page);
      await page.locator("input#email").fill(username);
      await page.locator("input#password").fill(password);
      await page.getByRole("button", { name: "Přihlásit" }).click();
      await page.goto("/admin/objednavky");
      await expect(page).toHaveTitle("Objednávky - Czechitas");
      await page.waitForLoadState("load");

      await page.locator("input[type='search']").fill(fakeEmail);
      await page.waitForLoadState();

      await page.waitForSelector("table");

      const row = page.locator("table tbody");
      const cellContainingText = row.locator("tr td", { hasText: contactName });

      await expect(cellContainingText).toBeVisible();
    });
  });

  test("04 Should verify Ares data not loading", async ({ page }) => {
    const orderFormIco = orderFormIcoLocator(page);
    const orderFormClient = orderFormClientLocator(page);
    const orderFormAddress = orderFormAddressLocator(page);

    await orderFormIco.fill(ico);
    await expect(orderFormClient).toHaveValue("");
    await expect(orderFormAddress).toHaveValue("");

    await page.locator('label:has-text("Jméno a příjmení")').click();

    const toastMessage = page.locator(".toast-message");
    await expect(toastMessage).toBeAttached();
    await expect(toastMessage).toHaveText(
      "Data z ARESu se nepodařilo načíst, vyplňte je prosím ručně"
    );
  });

  test("05-01 Verifies form won't be created when when incomplete", async ({
    page,
  }) => {
    const orderFormIco = orderFormIcoLocator(page);
    const orderFormClient = orderFormClientLocator(page);
    const orderFormAddress = orderFormAddressLocator(page);
    const orderFormSubstitute = orderFormSubstituteLocator(page);
    const orderFormName = orderFormNameLocator(page);
    const orderFormPhone = orderFormPhoneLocator(page);
    const orderFormEmail = orderFormMailLocator(page);
    const fakeEmail = faker.internet.email();
    const orderFormStartDate = orderFormStartDateLocator(page);
    const orderFormEndDate = orderFormEndDateLocator(page);
    const orderFormDayCamp = orderFormDayCampTabLocator(page);

    const orderFormDayCampChildren = page.getByRole("spinbutton", {
      name: "Počet dětí",
    });
    const orderFormDayCampChildAge = page.getByRole("textbox", {
      name: "ve věku",
    });
    const orderFormDayCampAdults = page.getByRole("spinbutton", {
      name: "Počet pedagogického doprovodu",
    });

    await test.step("Only ICO filled", async () => {
      await orderFormIco.fill(ico);
      await orderFormDayCamp.click();
      await clickToCreateOrder(page);
      await verifyHeadingNotVisible(page);
    });

    await test.step("Only ICO, Client filled", async () => {
      await orderFormClient.fill(client);
      await orderFormDayCamp.click();
      await clickToCreateOrder(page);
      await verifyHeadingNotVisible(page);
    });

    await test.step("Only ICO, Client, Address filled", async () => {
      await orderFormAddress.fill(address);
      await orderFormDayCamp.click();
      await clickToCreateOrder(page);
      await verifyHeadingNotVisible(page);
    });

    await test.step("Only ICO, Client, Address, Substitute filled", async () => {
      await orderFormSubstitute.fill(substitute);
      await orderFormDayCamp.click();
      await clickToCreateOrder(page);
      await verifyHeadingNotVisible(page);
    });

    await test.step("Only ICO, Client, Address, Substitute, Name filled", async () => {
      await orderFormName.fill(contactName);
      await orderFormDayCamp.click();
      await clickToCreateOrder(page);
      await verifyHeadingNotVisible(page);
    });

    await test.step("Only ICO, Client, Address, Substitute, Name, Phone filled", async () => {
      await orderFormPhone.fill(contactPhone);
      await orderFormDayCamp.click();
      await clickToCreateOrder(page);
      await verifyHeadingNotVisible(page);
    });

    await test.step("Only ICO, Client, Address, Substitute, Name, Phone filled, Email", async () => {
      await orderFormEmail.fill(fakeEmail);
      await orderFormDayCamp.click();
      await clickToCreateOrder(page);
      await verifyHeadingNotVisible(page);
    });

    await test.step("Only ICO, Client, Address, Substitute, Name, Phone filled, Email, start date", async () => {
      await orderFormStartDate.fill(startDate);
      await orderFormDayCamp.click();
      await clickToCreateOrder(page);
      await verifyHeadingNotVisible(page);
    });

    await test.step("Only ICO, Client, Address, Substitute, Name, Phone filled, Email, Start date, End date", async () => {
      const startDate = getFormattedStartDate();
      const endDate = getFormattedEndDate();

      await orderFormStartDate.fill(startDate);
      await orderFormEndDate.fill(endDate);
      await orderFormDayCamp.click();
      await clickToCreateOrder(page);
      await verifyHeadingNotVisible(page);
    });

    await test.step("Only ICO, Client, Address, Substitute, Name, Phone filled, Email, Start date, End date, Children", async () => {
      await orderFormDayCampChildren.fill("1");
      await orderFormDayCamp.click();
      await clickToCreateOrder(page);
      await verifyHeadingNotVisible(page);
    });

    await test.step("Only ICO, Client, Address, Substitute, Name, Phone filled, Email, Start date, End date, Children, Age", async () => {
      await orderFormDayCampChildAge.fill("1");
      await orderFormDayCamp.click();
      await clickToCreateOrder(page);
      await verifyHeadingNotVisible(page);
    });
  });

  test("05-02 Verifies order won't be created when invalid email used ", async ({
    page,
  }) => {
    await test.step("Filling in and sending the order form", async () => {
      const orderFormIco = orderFormIcoLocator(page);
      const orderFormClient = orderFormClientLocator(page);
      const orderFormAddress = orderFormAddressLocator(page);
      const orderFormSubstitute = orderFormSubstituteLocator(page);
      const orderFormName = orderFormNameLocator(page);
      const orderFormPhone = orderFormPhoneLocator(page);
      const orderFormEmail = orderFormMailLocator(page);
      const orderFormStartDate = orderFormStartDateLocator(page);
      const orderFormEndDate = orderFormEndDateLocator(page);
      const orderFormDayCamp = orderFormDayCampTabLocator(page);

      const startDate = getFormattedStartDate();
      const endDate = getFormattedEndDate();

      await orderFormIco.fill(ico);
      await page.locator("div.toast-message").waitFor({ state: "detached" });

      await orderFormSubstitute.fill(substitute);
      await orderFormName.fill(contactName);
      await orderFormPhone.fill(contactPhone);
      await orderFormEmail.fill("czechitas@");
      await orderFormStartDate.fill(startDate);
      await orderFormEndDate.fill(endDate);

      await orderFormClient.fill(client);
      await orderFormAddress.fill(address);

      await orderFormDayCamp.click();

      await expect(page.locator("#camp-students")).toBeAttached();
      await page.locator("#camp-students").fill("2");

      await page.getByRole("textbox", { name: "ve věku" }).fill("3 a 5 let");

      await page
        .getByRole("spinbutton", { name: "Počet pedagogického doprovodu" })
        .fill("1");

      await clickToCreateOrder(page);
      await verifyHeadingNotVisible(page);
    });
  });
});
