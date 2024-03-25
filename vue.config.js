const { defineConfig } = require("@vue/cli-service");
const Dotenv = require('dotenv-webpack');
module.exports = defineConfig({
  lintOnSave: false,
  configureWebpack: {
    plugins: [
      new Dotenv()
    ]
  },
  configureWebpack: {
    resolve: {
      fallback: {
        path: require.resolve('path-browserify'),
        os: require.resolve('os-browserify/browser'),
        crypto: require.resolve('crypto-browserify'),
        stream: require.resolve('stream-browserify'),
        //vm: require.resolve('vm-browserify'),
      },
    },
  },
});
