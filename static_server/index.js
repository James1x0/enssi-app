var bodyParser = require('body-parser');
var globSync   = require('glob').sync;
var routes     = globSync('./routes/**/*.js', { cwd: __dirname }).map(require);

function setup ( app ) {
  app.use(express.static(__dirname + '/dist'));

  routes.forEach(function ( route ) {
    route( app );
  });

  return app;
}

var express = require('express'),
    app     = setup( express() ),
    server  = require('http').Server(app);

var port = process.env.PORT || 80;

server.listen(port, function () {
  console.log('Server listening on port', port, '...');
});
