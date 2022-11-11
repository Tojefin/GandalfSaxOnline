const express = require('express');
const app = express();
const { createServer } = require("http");
const { Server } = require("socket.io");
const ip = require("ip");
const path = require('path');

app.use('/', express.static(path.join(__dirname, 'client')))
const httpServer = createServer(app);
const io = new Server(httpServer);

io.on('connect', (socket) => {
  socket.on("play", ()=>{
    console.log(`Socket ${socket.id}: play`)
    socket.broadcast.emit('play')
  })
  socket.on("pause", ()=>{
    console.log(`Socket ${socket.id}: pause`)
    socket.broadcast.emit('pause')
  })
})

httpServer.listen(80, () => {console.log(`Server started \nURL: http://${ip.address()}`)});