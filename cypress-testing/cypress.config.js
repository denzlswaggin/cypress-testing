const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://github.com",

    viewportWidth: 1280,
    viewportHeight: 720,

    defaultCommandTimeout: 8000,
    pageLoadTimeout: 30000,

    retries: {
      runMode: 2,   // v CI opakuj 2x při selhání
      openMode: 0,  // lokálně neopakuj
    },

    screenshotOnRunFailure: true,

    setupNodeEvents(on, config) {
      // Místo pro event listeners, např. code coverage
    },
  },
});

