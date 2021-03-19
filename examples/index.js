const app = document.getElementById('app');

app.innerHTML = `
This is an app in the template.<br><br>
Some variables from your <strong>webpack.config.js</strong>:<br>
<pre>
title: ${document.title}
window.env.apiHost: ${window.env.apiHost}
</pre>
`;

document.documentElement.style.fontFamily = 'Roboto';
