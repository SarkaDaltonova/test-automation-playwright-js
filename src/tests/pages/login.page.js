export class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailFieldLocator = this.page.getByLabel("Email");
    this.passwordFieldLocator = this.page.getByLabel("Heslo");
    this.loginButtonLocator = this.page.getByRole("button", {
      name: "Přihlásit",
    });
  }

  async open() {
    await this.page.goto("/prihlaseni");
  }

  async login(username, password) {
    await this.emailFieldLcator.fill(username);
    await this.passwordFieldLcator.fill(password);
  }
}
