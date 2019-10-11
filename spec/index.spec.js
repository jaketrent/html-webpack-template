/* eslint-env jest */
'use strict';

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MemoryFs = require('memory-fs');
const path = require('path');
const webpack = require('webpack');

jest.setTimeout(10000 /* ms */);

function compile (config = {}) {
  /** @type {import('webpack').Configuration} */
  const webpackConfig = {
    mode: 'production',
    entry: {
      app: path.join(__dirname, 'fixtures/index.js')
    },
    output: {
      path: '/dist',
      filename: '[name].bundle.js'
    },
    plugins: [
      new HtmlWebpackPlugin({
        ...config,
        template: require('..')
      })
    ]
  };

  const compiler = webpack(webpackConfig);
  const fs = compiler.outputFileSystem = new MemoryFs();
  return new Promise((resolve, reject) => {
    compiler.run(err => {
      if (err) return reject(err);
      resolve(fs.readFileSync('/dist/index.html', 'utf-8'));
    });
  });
}

describe('HtmlWebpackTemplate', () => {
  it('should be used by HtmlWebpackPlugin', async () => {
    const html = await compile();
    expect(html).toMatch(/<div id="app">/);
    expect(html).toMatch(/<script type="text\/javascript" src="app\.bundle\.js">/);
  });

  it('should be able to set custom appMountId', async () => {
    const config = {
      appMountId: 'customAppId'
    };
    const html = await compile(config);
    expect(html).toMatch(/<div id="customAppId">/);
  });

  it('should be able to set several appMountIds', async () => {
    const config = {
      appMountIds: ['customAppId', 'customAppId2', 'customAppId3']
    };
    const html = await compile(config);
    expect(html).toMatch(/<div id="customAppId">/);
    expect(html).toMatch(/<div id="customAppId2">/);
    expect(html).toMatch(/<div id="customAppId3">/);
  });

  it('should be able to setup Google Analytics', async () => {
    const config = {
      googleAnalytics: {
        trackingId: 'UA-XXXX-XX',
        pageViewOnLoad: true
      }
    };
    const html = await compile(config);
    expect(html).toContain('UA-XXXX-XX');
    expect(html).toContain("ga('send','pageview');");
  });

  it('should be able to set title tag', async () => {
    const config = {
      title: 'All the things'
    };
    const html = await compile(config);
    expect(html).toMatch(/<title>All the things<\/title>/);
  });

  it('should be able to set language', async () => {
    const config = {
      lang: 'hr_HR'
    };
    const html = await compile(config);
    expect(html).toMatch(/<html lang="hr_HR">/);
  });

  it('should be able to set mobile viewport', async () => {
    const config = {
      mobile: true
    };
    const html = await compile(config);
    expect(html).toMatch(/<meta content="width=device-width, initial-scale=1" name="viewport">/);
  });

  it('should be able to set description', async () => {
    const config = {
      description: 'Description goes here'
    };
    const html = await compile(config);
    expect(html).toMatch(/<meta name="description" content="Description goes here">/);
  });

  it('should be able to add link tags', async () => {
    const config = {
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
    const html = await compile(config);
    expect(html).toMatch(/<link href="https:\/\/fonts\.googleapis\.com\/css\?family=Roboto" rel="stylesheet"\/>/);
    expect(html).toMatch(/<link href="\/apple-touch-icon\.png" rel="apple-touch-icon" sizes="180x180"\/>/);
    expect(html).toMatch(/<link href="\/favicon-32x32\.png" rel="icon" sizes="32x32" type="image\/png"\/>/);
  });

  it('should be able to add script tags', async () => {
    const config = {
      scripts: [
        'http://example.com/somescript.js',
        {
          src: '/myModule.js',
          type: 'module'
        }
      ]
    };
    const html = await compile(config);
    expect(html).toMatch(/<script src="http:\/\/example\.com\/somescript\.js" type="text\/javascript">/);
    expect(html).toMatch(/<script src="\/myModule\.js" type="module">/);
  });

  it('should be able to set window properties', async () => {
    const config = {
      window: {
        env: {
          apiHost: 'http://myapi.com/api/v1'
        }
      }
    };
    const html = await compile(config);
    expect(html).toContain('window[\'env\'] = {"apiHost":"http://myapi.com/api/v1"};');
  });

  it('should be able to add html snippets', async () => {
    const config = {
      appMountId: 'customAppId',
      headHtmlSnippet: '<span class="head-html"></span>',
      bodyHtmlSnippet: '<span class="body-html"></span>',
      appMountHtmlSnippet: '<span class="app-html"></span>'
    };
    const html = await compile(config);
    expect(html).toMatch(/<div id="customAppId">/);
    expect(html).toMatch(/<span class="head-html"><\/span>/);
    expect(html).toMatch(/<span class="body-html"><\/span>/);
    expect(html).toMatch(/<span class="app-html"><\/span>/);
  });

  it('should be able to include warning about unsupported browsers', async () => {
    const config = {
      unsupportedBrowser: true
    };
    const html = await compile(config);
    expect(html).toMatch(/<div class="unsupported-browser">/);
  });
});
