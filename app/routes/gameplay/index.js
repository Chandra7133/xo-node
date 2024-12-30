const routes = require("express").Router()
const gameplayCtrl = require("../../controller/gameplay")

routes.post("/getData", (req, res, next) => { gameplayCtrl.getData(req, res, next) })
routes.post("/sendData", (req, res, next) => { gameplayCtrl.sendData(req, res, next) })

module.exports = routes