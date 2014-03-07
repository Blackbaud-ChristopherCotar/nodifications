// sockets.js
// 
// This modules encapsulates all socket events on the server.
//

var socketio = require('socket.io');
var Nodification = require('../models/nodificationModel.js');
var UserSettings = require('../controllers/config.js');

var connectedClients = {};

function pullAllNodifications(socket, model, cons_id){
  model.find({cons_id: cons_id, status: {"$ne": "Pending"}}).lean().exec(function(err, nodifications) {
    if(!err) {
      socket.emit('allNodifications', nodifications);
    } else {
      console.log(err);
    }
  });
};


module.exports.listen = function(app){
  io = socketio.listen(app);

  io.sockets.on('connection', function(socket){

    console.log('client connected!');



    // store which clients are connected
    socket.on('authenticate', function(data){

      console.log('registering new client');

      socket.set('cons_id', data.cons_id);
      connectedClients[data.cons_id] = socket;

      Object.keys(connectedClients).forEach(function(key) {
        console.log('cons_id: ' + key + ', socket session id: ' + connectedClients[key].id);
      });

      console.log('added client to cache');

      UserSettings.sendSettings(socket, data.cons_id);
      pullAllNodifications(socket, Nodification, data.cons_id);
    });

    socket.on('disconnect', function(){

      console.log('client disconnected!');

    });

    socket.on('updateSettings', function(data){
        UserSettings.updateUserSettings(data);
    });

    socket.on('loadSuccess', function() {
       socket.emit('confirmSuccess');
    });

  });

  return io;

};

// route based on cons_id
module.exports.routeToClient = function(cons_id, json){
  if (cons_id in connectedClients) {
    var socket = connectedClients[cons_id];

    pullAllNodifications(socket, Nodification, cons_id);
  }
}
