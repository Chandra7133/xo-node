const gameplayModel = require("../../model/gameplay")

exports.getData = async (req, res, next) => {
 try {
  const obj = await gameplayModel.getData(req['body'] || [])
  res.status(200).json(obj)
 } catch (error) {
  next(error)
 }
}

exports.sendData = async (req, res, next) => {
 try {
  const obj = await gameplayModel.sendData(req['body'] || [])
  res.status(200).json(obj)
 } catch (error) {
  next(error)
 }
}

