export function getPossibleMoves(board, game, row, col) {
  if (!game) return [];

  const piece = board[row][col];
  if (!piece) return [];

  const dir = piece === "red" ? -1 : 1;
  const moves = [];

  const directions = [-1, 1];

  directions.forEach(dc => {
    const r1 = row + dir;
    const c1 = col + dc;

    if (board[r1]?.[c1] === null) {
      moves.push({ row: r1, col: c1 });
    }
  });

  return moves;
}