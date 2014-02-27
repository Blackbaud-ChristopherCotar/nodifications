# Nōdifications

Nōdifications is a standalone NodeJS server that sends messages to the Luminate Online product to alert administrative users of certain tasks that have been completed or errored out.

General approach:
  Rest API call to NodeJS upon creation of any task
  Task status changes on task server -> send update to node with status to activation nodification
  manage socketio connections accross pages with cache saving socket connection session ids

TaskTracker.java
  job status tracker
    make call to nodejs for updated to notification
    
JobDatabase.java
  createRemoteJob
    make call to register notification
    
EmailDeliveryService
    
Socket.io
  socket session -> user mapping

Everything - Jackson

JavaScript Client
  rest api comm
  css
    - George KRAFF

Java Client
  task server job types
  abstract rest client
    - Jordan

NodeJS
  mongo
  socket
    - Chris, Kevin
  
