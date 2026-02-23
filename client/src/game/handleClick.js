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

  // [ {row, col, moves: [{row, col}, {row, col}] }, ... ]
  if (forcedCaptures.length > 0) {

    for(const m of forcedCaptures) {
      for (const mTo of m.moves) {
        if (!(mTo.row === row && mTo.col === col
           && m.row === selected.row && m.col === selected.col)) {
          alert("You must capture!");
          return;
        }
      }
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