const express = require('express');
const SocketServer = require('ws').Server;
const app = express();
const http = require('http')
const PORT = 3000;

app.use(express.static("public"))


const server = http.createServer(app)
const webSocket = new SocketServer({server});

webSocket.on('connection', (ws, req) =>{
    const inboundIP = req.headers['x-real-ip'];
    console.log(`Client connection ${inboundIP}`);
    webSocket.clients.forEach((client)=>{
	    client.send(`User IP ${inboundIP} just came into chat room.`);
    })
    ws.on('message', (msg)=>{
        console.log(msg) // <Buffer 68 65 6c 6c 6f 20 77 6f 72 6c 64>
        webSocket.clients.forEach((client)=>{
            // if(client !== ws && client.readyState === SocketServer.OPEN){
                client.send(`Got message from ${inboundIP}, ${msg}`)
            //}
        })
    })
    ws.on('close', ()=>{
        console.log('Close connection')
    })
})

server.listen(PORT, ()=>{
    console.log(`express listenting at port ${PORT}`)
})
