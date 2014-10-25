/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

// Vendor CSS
app.import('bower_components/font-awesome/css/font-awesome.css');
app.import('bower_components/animate.css/animate.css');

// Vendor JS
app.import('bower_components/socket.io-client/socket.io.js');
app.import('bower_components/bootstrap.growl/bootstrap-growl.js');
app.import('bower_components/moment/moment.js');

module.exports = app.toTree();
