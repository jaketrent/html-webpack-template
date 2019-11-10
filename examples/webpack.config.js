'use strict';

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/** @type {import('webpack').Configuration} */
module.exports = {
  entry: './index',
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'main.js'
  },
  module: {
    rules: [{ test: /\.js$/, loader: 'babel-loader' }]
  },
  devServer: {
    port: 3001,
    stats: 'errors-warnings'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: require('..'),
      googleAnalytics: {
        trackingId: 'UA-XXXX-XX',
        pageViewOnLoad: true
      },
      meta: {
        name: 'description',
        content: 'A better default template for html-webpack-plugin.'
      },
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
        'https://example.com/somescript.js',
        { src: '/myModule.js', type: 'module' }
      ],
      title: 'My App',
      window: {
        env: {
          apiHost: 'https://myapi.com/api/v1'
        }
      }
    })
  ]
};
