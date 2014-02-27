var express = require('express')
  , app = express()
  , server = require('http').createServer(app)
  , io = require('./lib/sockets').listen(server)
  , mongoose = require('mongoose')
  , Schema = mongoose.Schema;






mongoose.connect('mongodb://localhost/data/db');

server.listen(process.env.PORT || 3000);

app.configure(function(){
	app.set('port', process.env.PORT || 3000);
	app.use(express.static(__dirname + '/public'));
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(app.router);
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

var api = require('./controllers/api.js');
app.get('/', function(req, res){
  res.sendfile(__dirname + '/static/index.html');
});

app.get('/api/pullNodifications', api.pullNodifications);

app.post('/api/pushNodification', api.pushNodification);
