const app = document.getElementById('app')

app.innerHTML =
  'This is an app in the template.<br /><br />' +
  'Some variables from your webpack.config.js:<br/>' +
  'title: ' + document.title + '<br />' +
  'window.env.apiHost: ' + window.env.apiHost
