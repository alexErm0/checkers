const { createBoard} = require("./board");


function createGame(player1, player2) {
  return {
    board: createBoard(),
    players: {
      red: player1,
      black: player2
    },
    turn: "red",
    lastActive: Date.now()
  };
}

module.exports = { createGame};