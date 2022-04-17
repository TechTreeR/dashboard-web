const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  // 1.配置方式一: CLI提供的属性
  outputDir: "./build",
  publicPath: "./",
  devServer: {
    port: 3000, // 端口
  },
});
