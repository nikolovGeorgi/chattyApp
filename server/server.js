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

function updateUserCount(){
  return wss.broadcast(JSON.stringify({type: 'userCount', userCount}));
}

wss.on('connection', (client) => {
  const socketId = nextSocketId;
  nextSocketId++;
  userCount += 1;

  console.log('Client connected');
  updateUserCount();
  sockets[socketId] = { socket: client };

  // Per closed connection remove the socket ID from the list of connections && broadcast the updated user count;
  client.on('close', () => {
      delete sockets[socketId];
      userCount -= 1;
      updateUserCount();
      console.log('Client disconnected: ', socketId);
    }
  );

  // Per user connection set a color for them and update their information
  let rndColor = '#'+Math.floor(Math.random()*16777215).toString(16);
  let userColor = {type: 'userColor', color: rndColor};
  client.send(JSON.stringify(userColor));

  // Once a new message is received - find if it's updated content(message) || username -> broadcast the change;
  console.log('new connection', socketId);
  client.on('message', (data) => {
    const message = JSON.parse(data);
    message.uuid = uuid.v1();

    let outgoing = message;

    switch (message.type){
      case 'postMessage':
        outgoing.type = 'incomingMessage';
        outgoing.color = rndColor;
        break;
      case 'postNewUserName':
        outgoing.type = 'incomingNewUserName';
        break;
    }
    wss.broadcast(JSON.stringify(outgoing));
  });
});

server.listen(3001, function () {
  console.log('Listening on Port 3001!');
});
