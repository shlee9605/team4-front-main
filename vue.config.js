const { VUE_APP_SERVER } = process.env
const path = require('path')

module.exports = {
  chainWebpack: config => {
    config.resolve.alias.set('@', path.resolve(__dirname, './src/'))
  },
  lintOnSave: process.env.NODE_ENV !== 'production',
  devServer: {
    proxy: {
      '/serverApi': {
        target: VUE_APP_SERVER,
        changeOrigin: true,
        pathRewrite: {
          '^/serverApi': ''
        }
      }
    }
  }
}
