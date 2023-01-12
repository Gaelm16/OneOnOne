const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const userRoutes = require('./routes/userRoutes');
const chatRoutes = require('./routes/chatRoutes');
const messageRoutes = require('./routes/messageRoutes');
dotenv.config();

mongoose.connect(process.env.DATABASE_URL, () => console.log('database connected'));

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cookieParser());

app.use(cors({
    origin: ['http://localhost:3000'],
    credentials: true,
}));

const server = app.listen(4000, () => console.log('Server is running'))

const io = require('socket.io')(server, {
    pingTimeOut: 60000,
    cors:{
        origin: "http://localhost:3000",
        methods:["GET", "POST"]
    },
})

io.on("connection", (socket) => {
    console.log("connected to socket io");

    socket.on("setup", (userData) => {
        socket.join(userData._id);
        console.log(userData._id);
        socket.emit("connected");
    })

    socket.on("join-chat", (chat) => {
        socket.join(chat);
    })

    socket.on("sendNewMessage", (newMessage) => {
        socket.broadcast.emit("receive_Message", newMessage);
        console.log(newMessage.data);
    })

    socket.off("setup", () => {
        console.log("USER DISCONNECTED");
        socket.leave(userData._id);
    });
})

app.use('/', userRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/message', messageRoutes);
