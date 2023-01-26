/** @format */

const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://platform.storyteq.com/",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
