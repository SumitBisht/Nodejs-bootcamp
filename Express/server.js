// Add in the express import/include statement to rope in the express library
var express = require('express');

// Create an express object
var app = express();

// Select the root of the application
app.get('/', function(req, res){
  res.send('Hello Express');
});
// Server a particular route
app.get('/route', function(req, res){
  res.send('Another route selected');
});

app.get('/student/:id', function(req, res){
	res.send('RESTful routing with ID: '+req.params.id);
});


// Use the application instanct to run over a port
var server = app.listen(3000, function() {
    console.log('Express.js Started  and is listening on port %d', server.address().port);
});