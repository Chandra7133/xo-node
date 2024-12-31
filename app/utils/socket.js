exports.handleSocketConnection = (io) => {
    console.log("Socket.IO server is ready!");

    io.on("connection", (socket) => {
        console.log('New WebSocket client connected:', socket.id);
        io.emit("connected",{"status":true})
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
    });
};
