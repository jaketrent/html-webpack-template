var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: [
    './index'
  ],
  output: {
    path: __dirname + '/dist',
    filename: 'main.js'
  },
  resolveLoader: { root: path.join(__dirname, 'node_modules') },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader' }
    ]
  },
  devServer: {
    port: 3001
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: '../index.ejs',
      title: 'My App',
      mobile: true,
      googleAnalytics: {
        trackingId: 'UA-XXXX-XX',
        pageViewOnLoad: true
      },
      devServer: 'http://localhost:3001',
      appMountId: 'app',
      window: {
        env: {
          apiHost: 'http://myapi.com/api/v1'
        }
      }
    })
  ]
}
