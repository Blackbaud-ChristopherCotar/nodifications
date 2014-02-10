var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server);

server.listen(3000);

app.configure(function(){
	app.use(express.static(__dirname + '/public'));
});

app.get('/', function(req, res){
  res.sendfile(__dirname + '/static/index.html');
});

io.sockets.on('connection', function(socket){
  socket.emit('news', {hello: 'world' });
  socket.on('my other event', function(data){
    console.log(data);
  });
});
