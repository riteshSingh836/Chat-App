

import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';
import http from 'http';

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ['GET', 'POST']
    }
})

io.on('connection', (socket) => {
    console.log("connection is established");

    socket.on('new-message', (newMessage) => {
        socket.broadcast.emit('broadcast-message', newMessage)
    })

    socket.on('disconnect', () => {
        console.log("connection is disconnected");
    })
})

server.listen(3000, () => {
    console.log("Server is listening to 3000");
})