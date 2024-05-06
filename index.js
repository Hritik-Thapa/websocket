const express=require('express');
const http=require('http');
const path=require('path');
const {Server}=require('socket.io')

const app=express();
const server=http.createServer(app);
const io=new Server(server);

//Socket.io

io.on('connection',client=>{
    client.on('message',(message)=>{
        console.log(`Message received: ${message}`);
        io.emit('message',message);
    })
    console.log(`user connected ${client.id}`)
})


app.use(express.static(path.resolve('./public')));

app.get('/',(req,res)=>{
    return res.sendFile('/public/index.html');
})

server.listen(8000,()=>console.log('Server running on 8000'));
