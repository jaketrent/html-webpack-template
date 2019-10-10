/* eslint-env jest */
'use strict';

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackTemplate = require('../index');

const OUTPUT_DIR = path.resolve(__dirname, 'dist/');

jest.setTimeout(30000);
process.on('unhandledRejection', r => console.log(r));
process.traceDeprecation = true;

function testHtmlTemplate(htmlPluginConfiguration, expectedResults, done) {
  const webpackConfig = {
    mode: 'production',
    entry: {
      app: path.join(__dirname, 'fixtures/index.js')
    },
    output: {
      path: OUTPUT_DIR,
      filename: '[name]_bundle.js'
    },
    plugins: [new HtmlWebpackPlugin(htmlPluginConfiguration)]
  };

  webpack(webpackConfig, (err) => {
    expect(err).toBeFalsy();
    const dist = path.join(OUTPUT_DIR, 'index.html');
    const htmlContent = fs.readFileSync(dist).toString();
    for (let i = 0; i < expectedResults.length; i++) {
      const expectedResult = expectedResults[i];
      expect(htmlContent).toContain(expectedResult);
    }
    done();
  });
}

describe('HtmlWebpackTemplate', () => {
  it('should be used by HtmlWebpackPlugin', done => {
    testHtmlTemplate({
      template: HtmlWebpackTemplate
    },
    ['app_bundle.js'], done);
  });

  it('should be able set custom appMountId', done => {
    const config = {
      template: HtmlWebpackTemplate,
      appMountId: 'customAppId'
    };
    testHtmlTemplate(config, ['customAppId'], done);
  });

  it('should be able set several appMountIds', done => {
    const config = {
      template: HtmlWebpackTemplate,
      appMountId: ['customAppId', 'customAppId2', 'customAppId3']
    }
    testHtmlTemplate(config, ['customAppId', 'customAppId2', 'customAppId3'], done);
  });


  it('should be able to set Google Analytics', done => {
    const config = {
      template: HtmlWebpackTemplate,
      googleAnalytics: {
        trackingId: 'UA-XXXX-XX',
        pageViewOnLoad: true
      },
    };
    testHtmlTemplate(config, ['UA-XXXX-XX', 'ga(\'send\',\'pageview\')'], done);
  });

  it('should be able to title tag', done => {
    const config = {
      template: HtmlWebpackTemplate,
      title: 'All the things'
    };
    testHtmlTemplate(config, ['All the things'], done);
  });

  it('should be able to set lang', done => {
    const config = {
      template: HtmlWebpackTemplate,
      lang: 'hr_HR'
    };
    testHtmlTemplate(config, ['hr_HR'], done);
  });

  it('should be able to set mobile meta tag', done => {
    const config = {
      template: HtmlWebpackTemplate,
      mobile: true
    };
    testHtmlTemplate(config, ['width=device-width'], done);
  });


  it('should be able to set meta tags', done => {
    const config = {
      template: HtmlWebpackTemplate,
      meta: [{
        name: 'description',
        content: 'Describe'
      }],
    };
    testHtmlTemplate(config, ['description', 'Describe'], done);
  });

  it('should be able to set link tags', done => {
    const config = {
      template: HtmlWebpackTemplate,
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
      ]
    };
    testHtmlTemplate(config, ['Roboto', 'favicon-32x32.png', 'apple-touch-icon'], done);
  });

  it('should be able to set script tags', done => {
    const config = {
      template: HtmlWebpackTemplate,
      scripts: [
        'http://example.com/somescript.js',
        {
          src: '/myModule.js',
          type: 'module'
        }
      ],
    };
    testHtmlTemplate(config, ['somescript', 'myModule'], done);
  });

  it('should be able to set window properties', done => {
    const config = {
      template: HtmlWebpackTemplate,
      window: {
        env: {
          apiHost: 'http://myapi.com/api/v1'
        }
      }
    };
    testHtmlTemplate(config, ['env', 'http://myapi.com/api/v1'], done);
  });

  it('should be able to set html snippets', done => {
    const config = {
      template: HtmlWebpackTemplate,
      appMountId: "customAppId",
      headHtmlSnippet: '<span class="head-html" />',
      bodyHtmlSnippet: '<span class="body-html" />',
      appMountHtmlSnippet: '<span class="app-html" />'
    }
    testHtmlTemplate(config, ['head-html', 'body-html', 'app-html'], done);
  });

  it('should be able to set warning about unsupported browsers', done => {
    const config = {
      template: HtmlWebpackTemplate,
      unsupportedBrowser: true,
    }
    testHtmlTemplate(config, ['Sorry, your browser is not supported.'], done);
  });
})
