# HTML Webpack Template

This is a template for the [webpack](http://webpack.github.io/) plugin [html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin).
It has a few extra features than the [default template](https://github.com/ampedandwired/html-webpack-plugin/blob/master/default_index.html)
which will hopefully make it less likely that you'll have to create your own `index.html` file in your webpack project.

Templates for the html-webpack-plugin are implemented using [underscore templates](http://underscorejs.org/#template)
(previously, in 2.x, [blueimp templates](https://github.com/blueimp/JavaScript-Templates)). You can write your own as
well.

#### Legacy version

For the legacy version that works with `html-webpack-plugin@1.x`, `npm install html-webpack-plugin@2`.

## Installation

Install the template in your project with npm:

```shell
$ npm install html-webpack-template --save-dev
```

## Basic Usage

There are a couple required parameters:

- `inject`: Set to `false`. Controls asset addition to the template. This template takes care of that.
- `template`: Specify this module's `index.ejs` file.

And some other optional:

- `appMountId`: The `<div>` element id on which you plan to mount a JavaScript app (can include multiple elements using
                the `appMountIds` array).
- `devServer`: Insert the webpack-dev-server hot reload script at this host:port/path; e.g., http://localhost:3000.
- `baseHref`: Adjust the URL for relative URLs in the document ([MDN](https://developer.mozilla.org/en/docs/Web/HTML/Element/base)).
- `filename`: The file to write the HTML to. Defaults to `index.ejs`. You can specify a subdirectory here too; e.g.,
              `assets/admin.html`.
- `googleAnalytics.trackingId`: Track usage of your site via [Google Analytics](http://analytics.google.com).
- `googleAnalytics.pageViewOnLoad`: Log a `pageview` event after the analytics code loads.
- `links`: Array of `<link>` elements. Default value: `[]`.
  - If an array element is a string, the value is assigned to the `href` attribute and the `rel` attribute is set to
    `"stylesheet"`;
  - If an array element is an object, the object's properties and values are used as the attribute names and values,
    respectively.
- `meta`: Object that defines the meta tags. Default value: `{}`.
- `mobile`: Sets appropriate meta tag for page scaling.
- `scripts`: Array of external script imports to include on page. Default value: `[]`.
  - If an array element is a string, the value is assigned to the `src` attribute and the `type` attribute is set to
    `"text/javascript"`;
  - If an array element is an object, the object's properties and values are used as the attribute names and values,
    respectively.
- `title`: The title to use for the generated HTML document. Default value: `'Webpack App'`.
- `window`: Object that defines data you need to bootstrap a JavaScript app.

Plus any [html-webpack-plugin config options](https://github.com/ampedandwired/html-webpack-plugin#configuration)
otherwise available.

### Example

Here's an example webpack config illustrating how to use these options in your `webpack.config.js`:

```js
{
  // ...
  plugins: [
    new HtmlWebpackPlugin({
      // Required
      inject: false,
      template: require('html-webpack-template'),
      // template: 'node_modules/html-webpack-template/index.ejs',

      // Optional
      appMountId: 'app',
      baseHref: 'http://example.com/awesome',
      devServer: 3001,
      googleAnalytics: {
        trackingId: 'UA-XXXX-XX',
        pageViewOnLoad: true
      },
      meta: {
        description: 'A better default template for html-webpack-plugin.'
      },
      mobile: true,
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
        'http://somecool.com/script.js',
        {
          crossorigin: 'anonymous',
          integrity: 'sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8=',
          src: 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.1.1/jquery.min.js',
          type: 'text/javascript'
        }
      ],
      window: {
        env: {
          apiHost: 'http://myapi.com/api/v1'
        }
      }

      // And any other config options from html-webpack-plugin:
      // https://github.com/ampedandwired/html-webpack-plugin#configuration
    })
  ]
}
```
