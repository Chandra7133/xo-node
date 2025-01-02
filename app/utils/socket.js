
exports.handleSocketConnection = (io) => {
    console.log("Socket.IO server is ready!");
    io.on("connection", (socket) => {
        const playerIp = socket.handshake.address.split(":").pop();
        const id = socket.id;
        DATA[playerIp] = id;
        io.emit("connected",{"status":true})

        //addPlayer
        socket.on('add',(data)=>{
            let gameId = data['gameId'];
            let count = GAME_ID[gameId].length;
            let playerIp = GAME_ID[gameId][0];
            let clientId = DATA[playerIp];
            io.to(clientId).emit('count',{count : count});
        })

        //startGame
        socket.on('start',(data)=>{
            let gameId = data['gameId'];
            let playerIp = GAME_ID[gameId][1];
            let clientId = DATA[playerIp];
            io.to(clientId).emit('started',{"start" : true});
        })

        //setMove
        socket.on('move',(data)=>{
            let gameId = data['gameId'];
            let hostIp = socket.handshake.address.split(":").pop();
            let playerArr = GAME_ID[gameId].filter((ip)=> ip != hostIp);
            console.log(playerArr);
            playerArr.forEach(ip => {
                io.to(DATA[ip]).emit('moved',{'status':true});
            });
        })
    });
};


// // Handle client joining a room
        // socket.on('joinRoom', (roomName) => {
        //     console.log(`User ${socket.id} joining room: ${roomName}`);
        //     socket.join(roomName);
        // });

        // // Handle a custom event to send a message to all clients in a room
        // socket.on('sendMessageToRoom', (roomName, message) => {
        //     console.log(`Sending message to room ${roomName}: ${message}`);
        //     io.to(roomName).emit('message', { user: socket.id, message });
        // });

        // // Broadcast a message to all connected clients
        // socket.on('sendMessageToAll', (message) => {
        //     console.log(`Sending message to all clients: ${message}`);
        //     io.emit('broadcastMessage', { user: socket.id, message });
        // });

        // // Handle disconnect event
        // socket.on('disconnect', () => {
        //     console.log(`User ${socket.id} disconnected`);
        // });