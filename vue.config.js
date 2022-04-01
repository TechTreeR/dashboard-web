const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // 1.配置方式一: CLI提供的属性
  outputDir: "./build",
  // publicPath: './',
  devServer: {
    proxy: {
      "^/api": {
        target: "http://101.35.20.193:8081",
        pathRewrite: {
          "^/api": "",
        },
        changeOrigin: true,
      },
    },
  },
});
