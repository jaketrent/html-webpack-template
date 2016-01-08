# HTML Webpack Template

This is a template for the [webpack](http://webpack.github.io/) plugin [html-webpack-plugin](https://www.npmjs.com/package/html-webpack-plugin).  It has a few extra features than the [default template](https://github.com/ampedandwired/html-webpack-plugin/blob/master/default_index.html) which will hopefully make it less likely that you'll have to create your own `index.html` file in your webpack project.

Templates for the html-webpack-plugin are implemented using [blueimp templates](https://github.com/blueimp/JavaScript-Templates).  You can write your own as well.

#### Beta version

For the new version that works with `html-webpack-plugin@2.x`, `npm install html-webpack-plugin@3`.

## Installation

Install the template in your project with npm:

```shell
$ npm install html-webpack-template --save-dev
```

## Basic Usage

Once installed, you can reference the template in your `webpack.config.js` using the `template` option, passing the path to this module's `index.html` file.

Additional configuration options are as follows:

- `filename`: The file to write the HTML to. Defaults to `index.html`.
   You can specify a subdirectory here too (eg: `assets/admin.html`).
- `mobile`: Sets appropriate meta tags for page scaling.
- `googleAnalytics.trackingId`: Track usage of your site via [Google Analytics](http://analytics.google.com).
- `googleAnalytics.pageViewOnLoad`: Log a `pageview` event after the analytics code loads.
- `title`: The title to use for the generated HTML document.
- `devServer`: insert the webpack-dev-server hot reload script at this host:port/path (eg, http://localhost:3000)
- `appMountId`: div element id on which you plan to mount a javascript app (can include multiple elements using the `appMountId` array)
- `window`: object that defines data you need to bootstrap a javascript app

Here's an example webpack config illustrating how to use these options in your `webpack.config.js`:

```js
{
  // ...
  plugins: [
    new HtmlWebpackPlugin({
      template: 'node_modules/html-webpack-template/index.html',
      title: 'My App',
      filename: 'assets/admin.html',
      mobile: true,
      googleAnalytics: {
        trackingId: 'UA-XXXX-XX',
        pageViewOnLoad: true
      },
      devServer: 3000,
      appMountId: 'app',
      window: {
        env: {
          apiHost: 'http://myapi.com/api/v1'
        }
      }
    })
  ]
}
```
