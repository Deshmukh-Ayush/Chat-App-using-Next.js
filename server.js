import express from "express";
import http from "http";
import { Server } from "socket.io"

const app = express();
const server = http.createServer(app)
const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
})
const PORT = 3001 || process.env.SERVER_PORT

io.on("connection", (socket) => {
    console.log(`user Connected: ${socket.id}`)

    socket.on("joinChat", (chatId) => {
        socket.join(chatId);
    });

    socket.on("sendMessage" ,(message) => {
        io.to(message.chatId).emit("recieveMessage", message)
    })

    socket.on("disconnect", () => {
        console.log(`user disconnected: ${socket.id}`);
    })
})


server.listen(PORT, () => {
    console.log(`Server is listening on port http://localhost:${PORT}`)
})