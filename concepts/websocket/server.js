const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

const EVENT_TYPE = Object.freeze({
  'MESSAGE_TO_ALL': 1,
  'USER_DISCONNECT': 2
});

const MESSAGE_TYPE = Object.freeze({
  'JOIN_ROOM': 1,
  'LEFT_ROOM': 2,
  'ALL_MESSAGE': 3,
  'PRIVATE_MESSAGE': 4,
  'TYPING_MESSAGE': 5
});

app.use(require('express').static('public'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/html/index.html');
});

io.on('connection', (socket) => {
  
  io.emit(EVENT_TYPE.MESSAGE_TO_ALL, {
    username: socket.handshake.query.username,
    message: `join the room`,
    type: MESSAGE_TYPE.JOIN_ROOM
  });

  socket.on(EVENT_TYPE.MESSAGE_TO_ALL, (msg) => {
    io.emit(EVENT_TYPE.MESSAGE_TO_ALL, {
      sId: socket.id,
      ...msg
    });
  });

  socket.on('disconnect', () => {
    io.emit(EVENT_TYPE.MESSAGE_TO_ALL, {
      username: socket.handshake.query.username,
      message: `left the room`,
      type: MESSAGE_TYPE.LEFT_ROOM
    });
  });
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});