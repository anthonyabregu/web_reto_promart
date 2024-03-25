const { defineConfig } = require("@vue/cli-service");
const Dotenv = require('dotenv-webpack');
module.exports = defineConfig({
  lintOnSave: false,
  configureWebpack: {
    plugins: [
      new Dotenv()
    ]
  }
});
