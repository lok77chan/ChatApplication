const http = require('http');
const express = require('express');
const WebSocket = require('ws');
const path = require('path');
const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Static Folder
app.use(express.static(path.join(__dirname, 'public')));

const PORT = process.env.PORT || 5555;

server.listen(PORT, '0.0.0.0', () => {
  console.log(`Server started on ${PORT}`);
});

let users = [];

const checkUserPresence = () => {
  users.forEach(user => {
    if (user.checks > 3) {
      user.isOnline = false;
      user.socket.close();
    } else {
      user.checks++;
      user.socket.send(JSON.stringify({ tag: 'check' }));
    }
  });
};

setInterval(checkUserPresence, 5000);

wss.on('connection', (ws, req) => {
  const ip = req.socket.remoteAddress;
  console.log(`User connected from ${ip}`);

  ws.on('message', (message) => {
    const data = JSON.parse(message);

    switch (data.tag) {
      case 'login':
        users.push({
          id: ws._socket.remoteAddress,
          name: data.nickname,
          roomNumber: data.roomNumber,
          socket: ws,
          checks: 0,
          isOnline: true,
          publicKey: data.publicKey
        });
        ws.send(JSON.stringify({
          tag: 'presence',
          presence: users.map(user => ({
            nickname: user.name,
            jid: user.id,
            publickey: user.publicKey
          }))
        }));
        break;
      case 'chat message':
        const date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        if (hours <= 9) hours = `0${hours}`;
        if (minutes <= 9) minutes = `0${minutes}`;
        data.date = `${hours}:${minutes}`;
        users.forEach(user => {
          if (user.roomNumber === data.roomNumber && user.isOnline) {
            user.socket.send(JSON.stringify(data));
          }
        });
        break;
      case 'typing':
        users.forEach(user => {
          if (user.roomNumber === data.roomNumber && user.isOnline && user.socket !== ws) {
            user.socket.send(JSON.stringify({
              tag: 'typing',
              message: `${data.name} is typing...`
            }));
          }
        });
        break;
      case 'pvChat':
        const recipient = users.find(user => user.id === data.to);
        if (recipient) {
          recipient.socket.send(JSON.stringify(data));
        }
        break;
      case 'check':
        const user = users.find(user => user.id === ws._socket.remoteAddress);
        if (user) {
          user.checks = 0;
        }
        break;
    }
  });

  ws.on('close', () => {
    console.log(`User disconnected from ${ip}`);
    const index = users.findIndex(user => user.socket === ws);
    if (index !== -1) {
      users.splice(index, 1);
      users.forEach(user => {
        if (user.isOnline) {
          user.socket.send(JSON.stringify({
            tag: 'presence',
            presence: users.map(u => ({
              nickname: u.name,
              jid: u.id,
              publickey: u.publicKey
            }))
          }));
        }
      });
    }
  });
});
