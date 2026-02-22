import { getCaptureMoves } from "./capture";

export function getAllCaptures(board, player) {
  const captures = [];

  for (let r = 0; r < board.length; r++) {
    for (let c = 0; c < board[r].length; c++) {
      if (board[r][c] === player) {
        const moves = getCaptureMoves(board, player, r, c);

        if (moves.length > 0) {
          captures.push({
            row: r,
            col: c,
            moves
          });
        }
      }
    }
  }

  return captures;
}