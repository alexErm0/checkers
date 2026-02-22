function applyMove(game, move, playerId) {
  const { from, to } = move;
  const piece = game.board[from.row][from.col];

  if (!piece) return game;
  if (game.players[piece] !== playerId) return game;
  if (game.turn !== piece) return game;

  const dir = piece === "red" ? -1 : 1;

  if (
    to.row === from.row + dir &&
    Math.abs(to.col - from.col) === 1 &&
    !game.board[to.row][to.col]
  ) {
    game.board[to.row][to.col] = piece;
    game.board[from.row][from.col] = null;
    game.turn = piece === "red" ? "black" : "red";
    return game;
  }

  if (
    to.row === from.row + dir * 2 &&
    Math.abs(to.col - from.col) === 2
  ) {
    const midRow = from.row + dir;
    const midCol = from.col + (to.col - from.col) / 2;

    const middlePiece = game.board[midRow][midCol];

    if (
      middlePiece &&
      middlePiece !== piece &&
      !game.board[to.row][to.col]
    ) {
      game.board[midRow][midCol] = null;

      game.board[to.row][to.col] = piece;
      game.board[from.row][from.col] = null;

      game.turn = piece === "red" ? "black" : "red";
    }
  }

  return game;
}

module.exports = {applyMove };