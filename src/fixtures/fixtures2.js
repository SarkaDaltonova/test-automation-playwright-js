require("dotenv").config();
// import {expect, test as base} from "@playwright/test";

const { ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;

export const username = ADMIN_USERNAME;
export const password = ADMIN_PASSWORD;
export const userFullName = "Lišák Admin";

export const ico = "22834958";
export const client = "Czechitas";
export const address = "Krakovská 583/9, Praha 1, 110 00";
export const substitute = "Marie";
export const contactName = "Jana Nováková";
export const contactPhone = "777000222";
export const startDate = "01.01.2025";

export const OrderFormData = {
  loginPage: {
    title: "Přihlášení - Czechitas",
    emailFieldLabel: "Email",
    passwordFieldLabel: "Heslo",
    loginButtonLabel: "Přihlásit",
  },
  applicationsPage: {
    title: "Přihlášky - Czechitas",
    applicationsSectionName: "Přihlášky",
  },
};
