const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const socketio = require('socket.io');
const io = socketio(server);

app.use(express.static('group'));

let userA = null;
let userB = null;

io.on('connection', onConnection);

server.listen(3000, () => console.log('listening on *:3000'));

function onConnection(socket) {

    let role;

    if (userA === null) {
        userA = socket.id;
        role = "A";
    } 
    else if (userB === null) {
        userB = socket.id;
        role = "B";
    } 
    else {
        console.log("Chat is full");
        socket.disconnect();
        return;
    }

    console.log("user " + role + " connected");

    // Tell this browser who it is
    socket.emit('your role', role);

    socket.on('disconnect', function() {

        if (socket.id === userA) {
            userA = null;
            console.log("user A disconnected");
        }

        if (socket.id === userB) {
            userB = null;
            console.log("user B disconnected");
        }
    });

    socket.on('chat message', onChatMessage);
}

function onChatMessage(data) {

    console.log('message:', data.message);

    // Send the original sender to everybody
    io.emit('chat message', data);
}

