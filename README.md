# HTML Webpack Template

This is a template for the [webpack](http://webpack.github.io/) plugin [html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin).  It has a few extra features than the [default template](https://github.com/ampedandwired/html-webpack-plugin/blob/master/default_index.html) which will hopefully make it less likely that you'll have to create your own `index.html` file in your webpack project.

Templates for the html-webpack-plugin are implemented using [underscore templates](http://underscorejs.org/#template) (previously, in 2.x, [blueimp templates](https://github.com/blueimp/JavaScript-Templates)).  You can write your own as well.

#### Legacy version

For the legacy version that works with `html-webpack-plugin@1.x`, `npm install html-webpack-plugin@2`.

## Installation

Install the template in your project with npm:

```shell
$ npm install html-webpack-template --save-dev
```

## Basic Usage

There are a couple required parameters:

- `inject`: Set to `false`.  Controls asset addition to the template.  This template takes care of that.
- `template`: Specify this module's `index.ejs` file

And some other optional:

- `appMountId`: div element id on which you plan to mount a javascript app (can include multiple elements using the `appMountIds` array)
- `devServer`: insert the webpack-dev-server hot reload script at this host:port/path (eg, http://localhost:3000)
- `baseHref`: Adjust the url for relative urls in the document ([MDN](https://developer.mozilla.org/en/docs/Web/HTML/Element/base))
- `filename`: The file to write the HTML to. Defaults to `index.ejs`.
   You can specify a subdirectory here too (eg: `assets/admin.html`).
- `googleAnalytics.trackingId`: Track usage of your site via [Google Analytics](http://analytics.google.com).
- `googleAnalytics.pageViewOnLoad`: Log a `pageview` event after the analytics code loads.
- `mobile`: Sets appropriate meta tags for page scaling.
- `title`: The title to use for the generated HTML document.
- `window`: object that defines data you need to bootstrap a javascript app


Plus any [html-webpack-plugin config options](https://github.com/ampedandwired/html-webpack-plugin#configuration) otherwise available.

Here's an example webpack config illustrating how to use these options in your `webpack.config.js`:

```js
{
  // ...
  plugins: [
    new HtmlWebpackPlugin({
      // Required
      inject: false,
      template: require('html-webpack-template'),
      //template: 'node_modules/html-webpack-template/index.ejs',

      // Optional
      appMountId: 'app',
      baseHref: 'http://example.com/awesome',
      devServer: 3001,
      googleAnalytics: {
        trackingId: 'UA-XXXX-XX',
        pageViewOnLoad: true
      },
      mobile: true,
      window: {
        env: {
          apiHost: 'http://myapi.com/api/v1'
        }
      }

      // and any other config options from html-webpack-plugin
      // https://github.com/ampedandwired/html-webpack-plugin#configuration
    })
  ]
}
```
