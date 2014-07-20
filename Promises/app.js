var express = require('express'),
    fs = require('fs'),
    q = require('q');

var app = express();

var readFile = q.nbind(fs.readFile);


var p1 = readFile('one.txt').then(function(val) {
  console.log('file 1', val);
  return val; 
});

var p2 = readFile('two.txt').then(function(val) {
  console.log('file 2', val);
});

app.get('/promise', function(req, res){
  q.all([p1,p2]).then(function() {
    console.log('read both files!', JSON.stringify(p1), JSON.stringify(p2));
  }, function(err) {
    console.log('something bad happened', err.message ? err.message : '');
    if (err.stack) {
      console.log(err.stack);
    }
  });
});

var server = app.listen(8080, function() {});
