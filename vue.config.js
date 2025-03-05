const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      less: {
        // 如果你需要全局引入 LESS 变量文件
        additionalData: `@import "@/assets/style/breakpoint.less";`,
      },
    },
  },
})
