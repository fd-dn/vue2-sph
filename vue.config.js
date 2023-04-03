const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  //关闭语法校验
  lintOnSave:false,
  // configureWebpack:{

  //   plugins: [
  //     AutoImport({
  //       resolvers: [ElementPlusResolver()],
  //     }),
  //     Components({
  //       resolvers: [ElementPlusResolver()],
  //     }),
  //   ],

  // }
  devServer:{
    proxy: {
      "/api": {
        target:"http://gmall-h5-api.atguigu.cn",
        // pathRewrite: {"^/api" : ""}
      }
    }
  },
  productionSourceMap:false,
  publicPath: './',
})
