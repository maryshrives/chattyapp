// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuid = require('uuid');

// Set the port to 3001
const PORT = 3001;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  console.log('Client connected');
  let message = {
    id: uuid.v4(),
    type: "onlineStatus",
    content: `${wss.clients.size} users connected`
  }
  wss.broadcast(JSON.stringify(message));
  ws.on('message', handleMessage);
  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    let message = {
      id: uuid.v4(),
      type: "onlineStatus",
      content: `${wss.clients.size} users connected`
    }
    console.log(`Client disconnected: ${wss.clients.size} connected`);
    wss.broadcast(JSON.stringify(message));
  });
});

wss.broadcast = function(data) {
  wss.clients.forEach(function each(client) {
    client.send(data);
  });
};

let handleMessage = (incomingMessage) => {
  const receivedMessage = JSON.parse(incomingMessage);
  console.log('User ' + receivedMessage.username + " said " + receivedMessage.content + "-- type: " + receivedMessage.type);
  receivedMessage.id = uuid.v4();

  let toSend = JSON.stringify(receivedMessage);
  wss.broadcast(toSend);
  console.log(`Sent: ${toSend}`);
}






