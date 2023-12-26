const express = require('express');
const { createServer } = require("http");
const { Server } = require("socket.io");
const ip = require("ip");
const path = require('path');

const app = express();
app.use('/', express.static(path.join(__dirname, 'client')))

const httpServer = createServer(app);
const io = new Server(httpServer);

let time = 0
let users = new Set();

setInterval(()=>{
  io.emit('online', users.size)
}, 10000)

setInterval(()=> {
  time += 10010
  if (time > 117000) {
    time = 0
  }
  io.emit('sync', time)
}, 10000)

io.on('connect', (socket) => {

  users.add(socket.id)
  socket.emit('online', users.size)

  socket.on("disconnecting", () => {
    users.delete(socket.id)
  })

  socket.on("sync", ()=>{
    socket.emit('sync', time)
  })
})

httpServer.listen(80, () => {console.log(`Server started \nURL: http://${ip.address()}`)});