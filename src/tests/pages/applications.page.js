const { AppPage } = require("./app.page");
const { expect } = require("@playwright/test");

class TableRow {
  constructor(page, rowElement) {
    this.page = page;
    this.rowElement = rowElement;

    this.aplicationsLink = this.page.getByRole("link", { name: "Přihlášky" });
    this.loadingIndicator = this.page.locator("#DataTables_Table_0_processing");
    this.applicationsTable = this.page.locator(".dataTable");
    this.applicationsTableRows = this.applicationsTable
      .locator("tbody")
      .locator("tr");
    this.searchField = this.page.locator('input[type="search"]');
  }

  async getApplicationsTableRows() {
    await this.waitForTableToLoad();
    const rows = await this.applicationsTableRows.all();
    return rows.map(row => new TableRow(this.page, row)); 
  }

  async getValues() {
    const cells = await this.rowElement.locator("td");
    return; // implementace zde
  }
};

exports.ApplicationsPage = class ApplicationsPage {
  constructor(page) {
    this.page = page;
    this.aplicationsLink = this.page.getByRole("link", { name: "Přihlášky" });
    this.loadingIndicator = this.page.locator("#DataTables_Table_0_processing");
    this.applicationsTable = this.page.locator(".dataTable");
    this.applicationsTableRows = this.applicationsTable
      .locator("tbody")
      .locator("tr");
    this.searchField = this.page.locator('input[type="search"]');
  }

  async goToApplicationsPage() {
    await this.page.goto("/admin/prihlasky");
  }

  async waitForTableToLoad() {
    await this.page.waitForLoadState();
    await this.loadingIndicator.waitFor({ state: "hidden" });
  }

  async getApplicationsTableRows() {
    await this.waitForTableToLoad();
    const rows = await this.applicationsTableRows.all();
    return rows.map(row => new TableRow(this.page, row)); 
  }

  async searchInApplicationsTable(text) {
    await this.searchField.fill(text);
    await this.loadingIndicator.waitFor({ state: "visible" });
  }
};
