var express = require("express");
var app = express();
var port = 8080;

app.set('views', __dirname + '/views');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);

app.get("/", function(req, res){
    res.render("page");
});

app.use(express.static(__dirname + '/public'));
 
var io = require('socket.io').listen(app.listen(port));

console.log("Listening on port " + port);




/**
 * The sockets part
 */

io.sockets.on('connection', function (socket) {
    
    socket.emit('message', { message: 'welcome to the chat' });

    //Do something when we get some stuff from client
    socket.on('send', function (data) {
    		console.log("Server received: "+JSON.stringify(data));
        io.sockets.emit('message', data);
    });
});