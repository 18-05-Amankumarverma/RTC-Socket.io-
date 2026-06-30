const express = require("express")
const app = express()
const { createServer } = require("http")
const { Server } = require("socket.io")

const httpServer = createServer(app)
const io = new Server(httpServer, {
    cors: {
        origin:"http://localhost:5175"
    },
})

io.on("connection", (socket) => {

    // console.log(socket)

    console.log("User connected  :", socket.id)
    console.log(socket.handshake.address)

    // recives message and broadcast to all connected sockets
    socket.on("msg", (message) => {
        console.log(message)
        socket.broadcast.emit("msg", message)
    })

    socket.on("s_msg",({room,message})=>{
        socket.to(room).emit("s_msg",message)
    })

    socket.on("groupName",(group)=>{
        socket.join(group)
    })

    socket.on("g_msg",({group,message})=>{
        socket.to(group).emit("g_msg",message)
    })

    // disconnect event
    socket.on("disconnect", () => {
        console.log("socket is disconnected :", socket.id)
    })
})

httpServer.listen(3000, () => {
    console.log("server is listening on http://localhost:3000/")
})