/* global require, module */

var EmberApp = require('ember-cli/lib/broccoli/ember-app');

var app = new EmberApp();

// Vendor JS
app.import('bower_components/socket.io-client/socket.io.js');

module.exports = app.toTree();
