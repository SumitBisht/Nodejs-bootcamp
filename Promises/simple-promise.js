var q = require('q'),
    http = require('http');



// A simple async callback
function httpGetCallback(opts){
	http.get(opts, function (res) {
		console.log(res.statusCode);
	});
}

// Instead of the callback, return a promise
function httpGetPromise(opts){
	var deferred = q.defer();
	http.get(opts, deferred.resolve); // Make this GET function as a promise
	return deferred.promise;  // Return this promise
}


console.log('Starting Tests:');
httpGetCallback("http://fab.com");
// I get a promise.. when it gets resolved, I will be performing work over it.
httpGetPromise("http://fab.com").then( function(res){console.log(res.statusCode);});

