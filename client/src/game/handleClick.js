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
  forcedCaptures,
  roomId,
  socketId
}) {
  if (!game) return;

  const piece = board[row][col];
  const captures = getCaptureMoves(board, game, row, col);

  if (!selected) {
    if (!piece) return;
    if (game.players[piece] !== socketId) return;
    if (game.turn !== piece) return;
    
    setSelected({ row, col });
    if (forcedCaptures.length > 0) {
      setCaptureMoves(captures);
      setPossibleMoves([]);
    } else {
      setPossibleMoves(getPossibleMoves(board, game, row, col));
      setCaptureMoves([]);
    }
    return;
  }

  if (selected.row === row && selected.col === col) {
    setSelected(null);
    setPossibleMoves([]);
    setCaptureMoves([]);
    return;
  }

  
  if (forcedCaptures.length > 0) {
    const allowed = forcedCaptures.find(
      p => p.row === row && p.col === col
    );
    console.log(forcedCaptures + ", " + allowed);

    if (!allowed) {
      alert("You must capture!");
      return;
    }
  }

  socket.emit("move", {
    roomId,
    move: { from: selected, to: { row, col } }
  });

  setSelected(null);
  setPossibleMoves([]);
  setCaptureMoves([]);
}