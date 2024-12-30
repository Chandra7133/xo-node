exports.getData = async (reqParams) => {
    try {
      const { gameId } = reqParams;
  
      if (!global.GAME_ID || !GAME_ID[gameId] || !GAME_ID[gameId][0]) {
        return { status: false, msg: 'Game not found or restart the game' };
      }
  
      const playerIp = GAME_ID[gameId][0];
      if (!GAME_DATA[playerIp]) {
        return { status: false, msg: 'Game data unavailable, restart the game' };
      }
  
      const result = GAME_DATA[playerIp]['gameplay'];
      const gameStatus = checkGameStatus(result);
  
      if (gameStatus !== GAME_STATUS.ONGOING) {
        // Cleanup data after game ends
        delete GAME_DATA[playerIp];
        delete GAME_ID[gameId];
        return { status: false, msg: gameStatus };
      }
  
      return { status: true, data: result };
    } catch (error) {
      console.error('Error in getData:', error.message);
      return { status: false, msg: `Error: ${error.message}` };
    }
  };
  
  exports.sendData = async (reqParams) => {
    try {
      const { gameId, gameplay } = reqParams;
  
      if (!global.GAME_ID || !GAME_ID[gameId] || !GAME_ID[gameId][0]) {
        return { status: false, msg: 'Invalid game ID' };
      }
  
      const playerIp = GAME_ID[gameId][0];
      if (!GAME_DATA[playerIp]) {
        return { status: false, msg: 'Game data unavailable' };
      }
  
      GAME_DATA[playerIp]['gameplay'] = gameplay;
      return { status: true, data: 2174 };
    } catch (error) {
      console.error('Error in sendData:', error.message);
      return { status: false, msg: `Error: ${error.message}` };
    }
  };
  
  const GAME_STATUS = {
    ONGOING: 4,
    DRAW: "It's a draw"
  };
  
  function checkGameStatus(board) {
    // Check rows for a winner
    for (let row of board) {
      if (row[0] === row[1] && row[1] === row[2] && row[0] !== 0) {
        return `Winner is ${row[0]}`;
      }
    }
  
    // Check columns for a winner
    for (let col = 0; col < 3; col++) {
      if (board[0][col] === board[1][col] && board[1][col] === board[2][col] && board[0][col] !== 0) {
        return `Winner is ${board[0][col]}`;
      }
    }
  
    // Check diagonals for a winner
    if (board[0][0] === board[1][1] && board[1][1] === board[2][2] && board[0][0] !== 0) {
      return `Winner is ${board[0][0]}`;
    }
    if (board[0][2] === board[1][1] && board[1][1] === board[2][0] && board[0][2] !== 0) {
      return `Winner is ${board[0][2]}`;
    }
  
    // Check for ongoing game
    for (let row of board) {
      if (row.includes(0)) {
        return GAME_STATUS.ONGOING;
      }
    }
  
    // If no empty cells and no winner, it's a draw
    return GAME_STATUS.DRAW;
  }
  