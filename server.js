const express = require('express');
const SocketServer = require('ws').Server;
const app = express();
const http = require('http')
const PORT = 3003;

app.use(express.static("public"))


const server = http.createServer(app)
const webSocket = new SocketServer({server});

webSocket.on('connection', (ws, req) =>{
    const ip = req.headers.origin
    // const ip = req.headers['x-forwarded-for']
    console.log(`Client connection ${ip}`);
    ws.send("Hello wolrd")
    ws.on('message', (msg)=>{
        console.log(msg) // <Buffer 68 65 6c 6c 6f 20 77 6f 72 6c 64>
        webSocket.clients.forEach((client)=>{
            if(client !== ws && client.readyState === SocketServer.OPEN){
                client.send(`Got message from ${ip}, ${msg}`)
            }
        })
    })
    ws.on('close', ()=>{
        console.log('Close connection')
    })
})

server.listen(PORT, ()=>{
    console.log(`express listenting at port ${PORT}`)
})