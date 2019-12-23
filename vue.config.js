const path = require('path')
const name = '上报系统'

module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/', // TODO: Remember to change this to fit your need
  lintOnSave: false,
  pwa: {
    name: name
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [
        path.resolve(__dirname, 'src/styles/_variables.scss'),
        path.resolve(__dirname, 'src/styles/_mixins.scss')
      ]
    }
  },
  chainWebpack(config) {
    // Provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    config.set('name', name)

    // config.module.rule('ts').use('ts-loader').loader('ts-loader').end()

    // https://webpack.js.org/configuration/devtool/#development
    config
      .when(process.env.NODE_ENV === 'development',
        config => config.devtool('cheap-eval-source-map')
      )
  }
}
