var socket = io.connect('http://localhost');

socket.emit('authenticate', {cons_id: '1234'});

socket.on('allNodifications', function(data){
  console.log('recieving nodifications');
  console.log(data);
});

socket.on('nodification', function(data){
  console.log('new nodification recieved BRO');
  console.log(data);
});
