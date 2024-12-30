
exports.add = async (reqParams) => {
 try {
  const db = mongo.getDb()
  const insertDoc = {
   "service": reqParams["service"],
   "sub_service": reqParams["sub_service"] || "",
   "categories": reqParams["categories"],
   "status": 1,
   "created_date": new Date(),
   "created_by": reqParams[TOKEN_MEMBER_ID] || ""
  }
  const templateCollection = db.collection(TEMPLATES_COLLECTION)
  const updateDoc = { "status": 0, "modified_date": new Date(), "modified_by": reqParams[TOKEN_MEMBER_ID] || "" }
  const whr = { "status": 1, "service": reqParams["service"], "sub_service": reqParams["sub_service"] || "" }
  await templateCollection.updateOne(whr, { $set: updateDoc })
  const result = await templateCollection.insertOne(insertDoc)
  return result
 } catch (error) {
  throw error
 }
}


exports.generate = async (reqParams) => {
 try {
  let body = reqParams['body'];
  let gameId = body['gameId'].toString();
  let playerIp = reqParams['ip'].split(':')[3].toString();
  GAME_ID[gameId] = [];
  GAME_ID[gameId].push(playerIp);
  GAME_DATA[playerIp] = { gameId: gameId, gameplay: [[0, 0, 0], [0, 0, 0], [0, 0, 0]] }
  console.log(GAME_DATA)
  return { "status": true, "msg": 'Game is Created!!!' };
 } catch (error) {
  throw error
 }
}

exports.join = async (reqParams) => {
 try {
  let body = reqParams['body'];
  let gameId = body['gameId'].toString();
  let playerIp = reqParams['ip'].split(':')[3].toString();
  if (GAME_ID[gameId] && GAME_ID[gameId].length == 1) {
   GAME_ID[gameId].push(playerIp);
  }
  else {
   let msg = GAME_ID[gameId] ? 'limit Exceed' : "game id isn't created";
   return { "status": false, "msg": msg };
  }
  return { "status": true, "msg": 'join successfully!!' };
 } catch (error) {
  throw error
 }
}


exports.count = async (reqParams) => {
 try {
  let body = reqParams['body'];
  let gameId = body['gameId'].toString();
  let count = GAME_ID[gameId].length;
  return { "status": true, "count": count };
 } catch (error) {
  throw error
 }
}
