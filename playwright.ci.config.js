// @ts-check
require("dotenv").config({ path: ".env.testing" });
const { defineConfig, devices } = require("@playwright/test");
const { BASE_URL } = process.env;
