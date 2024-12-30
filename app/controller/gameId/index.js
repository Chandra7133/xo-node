const gameIdModel = require("../../model/gameId")

exports.generate = async (req, res, next) => {
 try {
  const obj = await gameIdModel.generate(req)
  res.status(200).json(obj)
 } catch (error) {
  next(error)
 }
}

exports.join = async (req, res, next) => {
 try {
  const obj = await gameIdModel.join(req)
  res.status(200).json(obj)
 } catch (error) {
  next(error)
 }
}


exports.count = async (req, res, next) => {
 try {
  const obj = await gameIdModel.count(req)
  res.status(200).json(obj)
 } catch (error) {
  next(error)
 }
}
