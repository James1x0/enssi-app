var express = require('express'),
    httpProxy = require('http-proxy'),
    apiProxy = httpProxy.createProxyServer(),
    botServer = process.env.BOTSERVER || 'localhost';
    botServerPort = process.env.BOTSERVERPORT || '3000';

module.exports = function ( app ) {
  app.all('/socket', function (req, res) {
    apiProxy.web(req, res, { target: 'http://' + botServer + ':' + botServerPort });
  });
};
