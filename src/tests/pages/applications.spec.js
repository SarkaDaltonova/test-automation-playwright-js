import {expect, test} from "@playwright/test";
import { LoginPage } from "./login.page.js";
import { ApplicationsPage } from "./applications.page.js";
import {
    username,
    password,
    applicationsSearchText,
    applicationsPageSize,
    ApplicationTexts
} from '../../fixtures/fixtures.js'

test.describe('Applications Page (tables)', async () => {

    test.beforeEach(async ({page}) => {
        const loginPage = new LoginPage(page);
        const applicationsPage = new ApplicationsPage(page);

        await loginPage.open();
        await loginPage.login(username, password);
        await applicationsPage.goToApplicationsPage();
        await test.expect(page).toHaveTitle(ApplicationTexts.applicationsPage.title);
    });

    test('should list all applications', async ({ page }) => {
        const applicationsPage = new ApplicationsPage(page);

        const allRows = await applicationsPage.getApplicationsTableRows(page);
        await expect(allRows.length, 'table should have >= ' + applicationsPageSize + ' rows')
            .toBeGreaterThanOrEqual(applicationsPageSize);

        for (const row of allRows) {
            const values = await row.getValues();
            await expect(values.name).toMatch(RegExp.NAME);
            await expect(values.date).toMatch(RegExp.DATE);
            await expect(values.paymentType).toMatch(RegExp.PAYMENT_TYPE);
            await expect(values.toPay).toMatch(RegExp.TO_PAY);
        }
    }); });