const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'v4c4sx',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
