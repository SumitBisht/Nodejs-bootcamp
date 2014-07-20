var express = require('express'),
    fs = require('fs'),
    q = require('q');

var app = express();

var readFile = q.nbind(fs.readFile);

app.get('/callback', function(req, res){
	fs.readFile('./one.txt', 'utf-8', function(err, data){
		if(err){
			console.error(err);
			return;
		}
		res.send(data);
	});
});


app.get('/*', function(req, res){
	// Use q.all to wait on both to be finished.
	// if things to be used are executed in parallel before, the overall
	// response time will get reduced.
	q.all([p1,p2]).then(function() {
	  console.log('read both files!');
	}, function(err) {
	  console.log('something bad happened', err.message ? err.message : '');
	  if (err.stack) {
	    console.log(err.stack);
	  }
    });

  });

var server = app.listen(8080, function() {});

var p1 = readFile('one.txt', 'utf-8').then(function(val) {

  console.log('file 1', 'utf-8', val); 
});

var p2 = readFile('two.txt', 'utf-8').then(function(val) {
  console.log('file 2', 'utf-8', val);
});