exports.getData = async (reqParams) => {
 try {
  let gameId = reqParams['gameId'];
  if (!GAME_ID[gameId][0]) {
   return { "status": false, "msg": 'restart the game' };
  }
  let playerIp = GAME_ID[gameId][0];
  let result = GAME_DATA[playerIp]['gameplay'];
  let msg = checkGameStatus(result);
  if (msg != 4) {
   delete GAME_DATA[playerIp];
   delete GAME_ID[gameId];
   return { "status": false, "msg": msg };
  }
  return { "status": true, "data": result };
 } catch (error) {
  throw error
 }
}

exports.sendData = async (reqParams) => {
 try {
  let gameId = reqParams['gameId'];
  let gameplay = reqParams['gameplay'];
  let playerIp = GAME_ID[gameId][0];
  GAME_DATA[playerIp]['gameplay'] = gameplay;
  return { "status": true, "data": 2174 };
 } catch (error) {
  throw error
 }
}

function checkGameStatus(board) {
 for (let row of board) {
  if (row[0] === row[1] && row[1] === row[2] && row[0] !== 0) {
   return `Winner is ${row[0]}`;
  }
 }
 for (let col = 0; col < 3; col++) {
  if (board[0][col] === board[1][col] && board[1][col] === board[2][col] && board[0][col] !== 0) {
   return `Winner is ${board[0][col]}`;
  }
 }
 if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== 0) {
  return `Winner is ${board[0][0]}`;
 }
 if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== 0) {
  return `Winner is ${board[0][2]}`;
 }
 for (let row of board) {
  if (row.includes(0)) {
   return 4;
  }
 }
 return "It's a draw";
}

