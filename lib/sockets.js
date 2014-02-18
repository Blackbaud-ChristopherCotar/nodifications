// sockets.js
// 
// This modules encapsulates all socket events on the server.
//

var socketio = require('socket.io');

module.exports.listen = function(app){
  io = socketio.listen(app);

  io.sockets.on('connection', function(socket){
    socket.emit('news', {hello: 'world' });

    socket.on('my other event', function(data){
      console.log(data);
    });

    setInterval(function(){
      socket.emit('notification', {type: 'email', url: 'google.com'});
    }, 2000);
  });

  return io;

};
