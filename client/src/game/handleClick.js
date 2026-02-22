import socket from "../socket";
import { getPossibleMoves } from "./possibleMoves";
import { getCaptureMoves } from "./capture";

export function handleClick({
  row,
  col,
  board,
  game,
  selected,
  setSelected,
  possibleMoves,
  setPossibleMoves,
  captureMoves,
  setCaptureMoves,
  roomId,
  socketId
}) {
  if (!game) return;

  const piece = board[row][col];

  if (!selected) {
    if (!piece) return;
    if (game.players[piece] !== socketId) return;
    if (game.turn !== piece) return;

    const moves = getPossibleMoves(board, game, row, col);
    const cMoves = getCaptureMoves(board, game, row, col);

    setSelected({ row, col });
    setPossibleMoves(moves);
    setCaptureMoves(cMoves);
    return;
  }

  if (selected.row === row && selected.col === col) {
    setSelected(null);
    setPossibleMoves([]);
    setCaptureMoves([]);
    return;
  }

  socket.emit("move", {
    roomId,
    move: { from: selected, to: { row, col } }
  });

  setSelected(null);
  setPossibleMoves([]);
  setCaptureMoves([]);
}