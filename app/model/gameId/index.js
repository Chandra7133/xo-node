
exports.generate = async (reqParams) => {
  try {
    const { body, ip } = reqParams;
    if (!body || !body.gameId) {
      throw new Error("Invalid request: Missing gameId in the body");
    }
    if (!ip) {
      throw new Error("Invalid request: Missing IP address");
    }

    const gameId = body.gameId.toString();
    const playerIp = ip.split(":").pop();
    if (!playerIp) {
      throw new Error("Unable to extract player IP");
    }

    // Initialize game data
    if (!global.GAME_ID) global.GAME_ID = {};
    if (!global.GAME_DATA) global.GAME_DATA = {};

    if (!GAME_ID[gameId]) {
      GAME_ID[gameId] = [];
    }
    GAME_ID[gameId].push(playerIp);

    GAME_DATA[playerIp] = {
      gameId: gameId,
      gameplay: Array(3)
        .fill(null)
        .map(() => Array(3).fill(0)),
    };

    // console.log("Game data updated:", GAME_DATA);
    return { status: true, msg: "Game is Created!!!" };
  } catch (error) {
    console.error("Error creating game:", error.message);
    return { status: false, msg: `Error: ${error.message}` };
  }
};

exports.join = async (reqParams) => {
  try {
    const { body, ip } = reqParams;
    if (!body || !body.gameId) {
      return {
        status: false,
        msg: "Invalid request: Missing gameId in the body",
      };
    }
    if (!ip) {
      return { status: false, msg: "Invalid request: Missing IP address" };
    }

    const gameId = body.gameId.toString();
    const playerIp = ip.split(":").pop(); // Extract the last segment of the IP address

    if (!global.GAME_ID) global.GAME_ID = {};

    if (!GAME_ID[gameId]) {
      return { status: false, msg: "Game ID doesn't exist" };
    }

    if (GAME_ID[gameId].length === 1) {
      GAME_ID[gameId].push(playerIp);
      return { status: true, msg: "Joined successfully!" };
    } else {
      return { status: false, msg: "Player limit exceeded" };
    }
  } catch (error) {
    console.error("Error joining game:", error.message);
    return { status: false, msg: `Error: ${error.message}` };
  }
};

exports.count = async (reqParams) => {
  try {
    const { body } = reqParams;
    if (!body || !body.gameId) {
      return {
        status: false,
        msg: "Invalid request: Missing gameId in the body",
      };
    }

    const gameId = body.gameId.toString();

    if (!global.GAME_ID || !GAME_ID[gameId]) {
      return { status: false, msg: "Game ID doesn't exist" };
    }

    const count = GAME_ID[gameId].length;
    return { status: true, count };
  } catch (error) {
    console.error("Error counting players:", error.message);
    return { status: false, msg: `Error: ${error.message}` };
  }
};
