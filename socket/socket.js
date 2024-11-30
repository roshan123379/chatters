import express from "express"
import http from "http"
import {createServer} from "http"
import {Server} from "socket.io"


const app = express()

const server = http.createServer(app)
const io = new Server(server,{
    cors:{
        origin:"https://chatterrs.netlify.app",
        methods:"GET, POST"
    }
})


export const getRecieverSocketId = (recieverId) =>{
    return userSocketmap[recieverId]
}

const userSocketmap = {}

io.on("connection",(socket)=>{
    const userId = socket.handshake.query.userId;

    if(userId !== undefined) userSocketmap[userId] = socket.id;
    io.emit("getOnlineUsers",Object.keys(userSocketmap))

    socket.on("disconnect",()=>{
        delete userSocketmap[userId],
        io.emit("getOnlineUsers",Object.keys(userSocketmap))
    })
})

export {app , io, server}
