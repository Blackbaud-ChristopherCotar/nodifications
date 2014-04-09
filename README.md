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
  
Installing NodeJs:

Update Ubuntu packages and install the required dependencies:

sudo apt-get update
sudo apt-get upgrade
sudo apt-get install gcc cpp g++ automake1.9 autoconf libtool flex bison python-software-properties

Download the latest version of node.js from the official site, then extract the archive file and install node.js:

cd /usr/local/src
wget http://nodejs.org/dist/node-latest.tar.gz
tar zxvf node-latest.tar.gz
cd node-*
./configure
make
sudo make install
