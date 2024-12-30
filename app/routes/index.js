const routes = require("express").Router()
const gameId = require("./gameId")
const gameplay = require("./gameplay")
routes.use("/gameId", gameId)
routes.use("/gameplay",gameplay);
routes.get('/', (req, res) => {
 const ip = req.ip;
 console.log('User IP address: ', ip);
 res.status(200).json({ "message": "connected", 'User IP address: ': ip })
});

module.exports = routes