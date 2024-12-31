const routes = require("express").Router()
const gameId = require("./gameId")
const gameplay = require("./gameplay")
routes.use("/gameId", gameId)
routes.use("/gameplay",gameplay);
routes.get('/', (req, res) => {
    console.log("test")
 res.status(200).json({ "message": "connected","status":true })
});

module.exports = routes