const routes = require("express").Router()
const gameIdCtrl = require("../../controller/gameId")

routes.post("/generate", (req, res, next) => { gameIdCtrl.generate(req, res, next) })

routes.post("/join",(req, res, next) => { gameIdCtrl.join(req, res, next) })

routes.post("/count",(req, res, next) => { gameIdCtrl.count(req, res, next) })


module.exports = routes