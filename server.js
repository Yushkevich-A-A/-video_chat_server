const express = require('express');
const app = express();
const cors = require('cors');
const server = require('http').createServer(app);
const io = require('socket.io')(server);


app.use(cors());
// to change your ports for different cors stuff:
app.set('port', process.env.PORT || 7070);
app.listen(app.get('port'));


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

const users = [];
const connections = [];

io.on('connection', (socket) => {
  console.log(socket);
  connections.push(socket);

  socket.on('disconnect', (data) => {
    connections.splice(connections.indexOf(data), 1)
  })
})