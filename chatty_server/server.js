const express = require('express');
const WebSocket = require('ws');
const http = require('http');
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({server});

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
  client.send(JSON.stringify({type: 'userCount', userCount: socketId}));

  sockets[socketId] = {
      socket: client,
      first: wss.clients.size === 1
  };

  client.on('close', () => {
      delete sockets[socketId];
      userCount -= 1;
      wss.broad(JSON.stringify({type: 'userCount', socketId}));
      console.log('Client disconnected: ', socketId);
    }
  );

  console.log('new connection', socketId);
  client.on('message', (data) => {
    // console.log('received', data);
    const message = JSON.parse(data);
    console.log(message, '-- message @ server');
    let outgoing = message;

    switch (message.type){
      case 'postMessage':
        outgoing.type = 'incomingMessage';
        break;
      case 'postNewUserName':
        outgoing.type = 'incomingNewUserName';
        break;
      case 'userCount':
        outgoing.type = 'userCount';
        break;
    }
    wss.broadcast(JSON.stringify(outgoing)); //send to all users
    // ws.send(JSON.stringify(outgoing));
    // Object.values(sockets).find(s => s.first).socket.send(JSON.stringify(outgoing));
  });
});

server.listen(3001, function () {
  console.log('Listening on Port 3001!');
});
