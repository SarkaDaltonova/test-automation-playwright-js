export class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailFieldLocator = this.page.getByLabel("Email");
    this.passwordFieldLocator = this.page.getByLabel("Heslo");
    this.loginButtonLocator = this.page.getByRole("button", {
      name: "Přihlásit",
    });
    this.registrationError = this.page.locator(".invalid-feedback").locator("strong");
    this.logoutLinkLocator = this.page.locator("#logout-link");


    // checknout //
    this.registeredUserName = this.page
    .locator("div")
    .locator(".navbar-right")
    .locator("span");


  }

  async open() {
    await this.page.goto("/prihlaseni", { timeout: 5000 });
  }

  async login(username, password) {
    // funknce na login //
    await this.emailFieldLocator.fill(username);
    await this.passwordFieldLocator.fill(password);
    await this.loginButtonLocator.click();
  }
}
