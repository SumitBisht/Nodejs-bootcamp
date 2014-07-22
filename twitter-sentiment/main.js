var express = require('express'),
  routes = require('routes'),
  http = require('http'),
  path = require('path'),
  fs = require('fs');

  var app = express();

  app.set('port', process.env.PORT || 8080);
  app.set('view', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');
  app.use(express.logger('dev'));
  app.use(express.json());
  app.use(expres.urlencoded());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));

  if('development' == app.get('env')){
  	app.use(express.errorHandler());
  }



  app.get('/', routes.index);
  app.get('/ping', routes.ping);

  http.createServer(app).listen(app.get('port'), function(){
  	console.log('Express server started on port: ', app.get('port'));
  });
