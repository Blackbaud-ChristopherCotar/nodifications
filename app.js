var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('socket.io').listen(server)
  , mongoose = require('mongoose')
  , Schema = mongoose.Schema;






mongoose.connect('mongodb://localhost/data/db');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback () {
  console.log('DB connection successful!!!');
});

var nodificationSchema = new Schema({
	cons_id:          String,
	session_id:       String,
	origin:           String,
	destination_url:  String,
	site_id:          String,
	date:             Date
});

var nodification = mongoose.model('nodification', nodificationSchema);






server.listen(process.env.PORT || 3000);

app.configure(function(){
	app.set('port', process.env.PORT || 3000);
	app.use(express.static(__dirname + '/public'));
});

app.get('/', function(req, res){
  res.sendfile(__dirname + '/static/index.html');
});

app.get('/users', function(req, res){
	console.log('api request for /users');
	res.json({user1: ''});
});

io.sockets.on('connection', function(socket){
  socket.emit('news', {hello: 'world' });
  socket.on('my other event', function(data){
    console.log(data);
  });
  setInterval(function(){
    socket.emit('notification', {type: 'email', url: 'google.com'});
  }, 2000);
});
