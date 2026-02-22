export function getCaptureMoves(board, game, row, col) {
  if (!game) return [];

  const piece = board[row][col];
  if (!piece) return [];

  const cMoves = [];

  const directions = [
    [-1, -1],
    [-1, 1],
    [1, -1],
    [1, 1]
  ];

  directions.forEach(([dr, dc]) => {
    const r1 = row + dr;
    const c1 = col + dc;

    const r2 = row + dr * 2;
    const c2 = col + dc * 2;

    if (
      board[r1]?.[c1] &&
      board[r1][c1] !== piece &&
      board[r2]?.[c2] === null
    ) {
      cMoves.push({ row: r2, col: c2 });
    }
  });

  return cMoves;
}