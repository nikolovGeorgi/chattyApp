const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({server});
const uuid = require('node-uuid');

let nextSocketId = 1;
let userCount = 0;
const sockets = {};
wss.broadcast = function broadcast(data){
  wss.clients.forEach(function each(client) {
    client.send(data);
  })
}

wss.on('connection', (client) => {
  const socketId = nextSocketId;
  nextSocketId++;
  userCount += 1;
  console.log('Client connected');
  wss.broadcast(JSON.stringify({type: 'userCount', userCount}));

  sockets[socketId] = { socket: client };

  client.on('close', () => {
      delete sockets[socketId];
      userCount -= 1;
      wss.broadcast(JSON.stringify({type: 'userCount', userCount}));
      console.log('Client disconnected: ', socketId);
    }
  );

  let rndColor = '#'+Math.floor(Math.random()*16777215).toString(16);
  let userColor = {type: 'userColor', color: rndColor};

  client.send(JSON.stringify(userColor));

  console.log('new connection', socketId);
  client.on('message', (data) => {
    const message = JSON.parse(data);
    message.uuid = uuid.v1();
    
    let outgoing = message;

    switch (message.type){
      case 'postMessage':
        outgoing.type = 'incomingMessage';
        break;
      case 'postNewUserName':
        outgoing.type = 'incomingNewUserName';
        break;
    }
    wss.broadcast(JSON.stringify(outgoing)); //send to all users
  });
});

server.listen(3001, function () {
  console.log('Listening on Port 3001!');
});
