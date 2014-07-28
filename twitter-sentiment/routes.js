var twit = require('twit'),
    sentimental = require('Sentimental');

exports.index = function(req, res){
	res.render('index', {title: 'twitter sentiment analysis'});
}
exports.ping = function(req, res){
	res.send('pong', 200);
}
exports.search = function(req, res){
  console.log("Body:"+ JSON.stringify(req.body));
  var choices = [req.body.choice1, req.body.choice2];
  console.log(choices);
  var today = new Date();
  // establish the twitter config (grab your keys at dev.twitter.com)
  var twitter = new twit({
    consumer_key: 'SqOdY0TqbOHEviBN1Z56QYZPc',
    consumer_secret: 'rLMaQqqqYtcm9i9Hxnuws22MJ2i1xOzWpRnAZZlT3gnLp6vlyL',
    access_token: '104158675-3IZ6eu0xqug8dTrhU6jTeV2pQMNWVYgnhnysH8X9',
    access_token_secret: 'wX73y1yupC8LWdc1Gefvigja6uAuxEP8UUg6Ovizu2Dxl'
  });
  // set highest score
  var highestScore = -Infinity;
  // set highest choice
  var highestChoice = null;
  // create new array
  var array = [];
  // set score
  var score = 0;
  console.log("----------")

  // iterate through the choices array from the request
  for(var i = 0; i < choices.length; i++) {
    (function(i) {
    // add choice to new array
    array.push(choices[i])
    // grad 20 tweets from today
    twitter.get('search/tweets', {q: '' + choices[i] + ' since:' + today.getFullYear() + '-' +
      (today.getMonth() + 1) + '-' + today.getDate(), count:20}, function(err, data) {
        // perform sentiment analysis
        score = performAnalysis(data['statuses']);
        console.log("score:", score)
        console.log("choice:", choices[i])
        //  determine winner
        if(score > highestScore) {
          highestScore = score;
          highestChoice = choices[i];
          console.log("winner:",choices[i])
        }
      });
    })(i)
  }
  // send response back to the server side; why the need for the timeout?
  setTimeout(function() {
    // res.end(JSON.stringify({'score': highestScore, 'choice': highestChoice}))
    res.render('result',{'score': highestScore, 'choice': highestChoice}); 
  }, 5000);
}

function performAnalysis(tweets){
	var results =0;
	for(i=0; i<tweets.length; i++){
		tweet = tweets[i]['text'];
    retweets = tweets[i]['retweet_count'];
    favorites = tweets[i]['favorite_count'];
    // remove the hastag from the tweet text
    tweet = tweet.replace('#', '');
    // perform sentiment on the text
    var score = sentimental.analyze(tweet)['score'];
    // calculate score
    results += score;
    if(score > 0){
      if(retweets > 0) {
        results += (Math.log(retweets)/Math.log(2));
      }
      if(favorites > 0) {
        results += (Math.log(favorites)/Math.log(2));
      }
    }
    else if(score < 0){
      if(retweets > 0) {
        results -= (Math.log(retweets)/Math.log(2));
      }
      if(favorites > 0) {
        results -= (Math.log(favorites)/Math.log(2));
      }
    }
    else {
      results += 0;
    }
  }
  // return score
  results = results / tweets.length;
  return results
}