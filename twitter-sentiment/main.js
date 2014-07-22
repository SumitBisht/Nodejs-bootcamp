var express = require('express'),
  routes = require('./routes'),
  http = require('http'),
  path = require('path'),
  fs = require('fs');

  var app = express();

  app.set('port', process.env.PORT || 8080);
  app.locals.basedir = path.join(__dirname, 'views');
  app.set('view engine', 'jade');
  app.use(express.logger());
  app.use(express.json());
  app.use(express.urlencoded());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.json());
  app.use(express.bodyParser());
  app.use(express.static(path.join(__dirname, 'public')));

  if('development' == app.get('env')){
  	app.use(express.errorHandler());
  }



  app.get('/', routes.index);
  app.get('/ping', routes.ping);
  app.post('/', routes.search);

  http.createServer(app).listen(app.get('port'), function(){
  	console.log('Express server started on port: ', app.get('port'));
  });
