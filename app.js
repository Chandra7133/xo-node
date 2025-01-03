require("./app/utils/config")
require("./app/utils/constants")
const express = require("express");
const cors = require("cors");
const http = require('http');
const socketIo = require('socket.io');
const routes = require("./app/routes");
const { handleSocketConnection } = require('./app/utils/socket'); 

const app = express();
const server = http.createServer(app);

const corsOptions = {
    origin: true, 
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(routes);

const io = socketIo(server, { cors: corsOptions });

// Handle socket connections
handleSocketConnection(io);

server.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
}).on('error', (err) => {
    console.error('Server failed to start: ', err);
});