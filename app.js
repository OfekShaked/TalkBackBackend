const express = require('express');
const cors = require('cors');
const socketIo= require('socket.io');
const app = express();
const config = require('./configs/general_config');
const accountService = require('./src/services/account');
const mongoose = require('./src/database/db');

app.use(express.json());
app.use(cors())

//Routes middlewares
 app.use('/account', require('./src/routes/account'));
 app.use('/conversations',require('./src/routes/conversations'));



const server = app.listen(config.PORT, console.log("App is up on " + config.PORT));
const io = socketIo(server);

io.on('connection',(socket)=>{

    socket.on('user_online', (socket)=>{
        accountService.setUserOnline(socket.handshake.query.username)
    })

    socket.on('disconnect',()=>{
        console.log("User disconnected");
    })
})