
exports.index = function(req, res){
	res.render('index', {title: 'twitter sentiment analysis'});
}
exports.ping = function(req, res){
	res.send('pong', 200);
}
