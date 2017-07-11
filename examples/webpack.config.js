var path = require('path')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: ['./index'],
  output: {
    path: __dirname + '/dist',
    filename: 'main.js'
  },
  resolveLoader: { root: path.join(__dirname, 'node_modules') },
  module: {
    loaders: [{ test: /\.js$/, loader: 'babel-loader' }]
  },
  devServer: {
    port: 3001
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: false,
      template: '../index.ejs',
      appMountId: 'app',
      devServer: 'http://localhost:3001',
      googleAnalytics: {
        trackingId: 'UA-XXXX-XX',
        pageViewOnLoad: true
      },
      meta: [
        {
          name: 'description',
          content: 'A better default template for html-webpack-plugin.'
        }
      ],
      mobile: true,
      lang: 'en-US',
      links: [
        'https://fonts.googleapis.com/css?family=Roboto',
        {
          href: '/apple-touch-icon.png',
          rel: 'apple-touch-icon',
          sizes: '180x180'
        },
        {
          href: '/favicon-32x32.png',
          rel: 'icon',
          sizes: '32x32',
          type: 'image/png'
        }
      ],
      scripts: [
        'http://example.com/somescript.js',
        {
          src: '/myModule.js',
          type: 'module'
        }
      ],
      title: 'My App',
      window: {
        env: {
          apiHost: 'http://myapi.com/api/v1'
        }
      }
    })
  ]
}
