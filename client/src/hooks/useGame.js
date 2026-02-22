import { useEffect, useState } from "react";
import socket from "../socket";
import { handleClick } from "../game/handleClick";
import { getAllCaptures } from "../game/getAllCaptures";

export default function useGame() {
  const [board, setBoard] = useState([]);
  const [roomId, setRoomId] = useState(null);
  const [selected, setSelected] = useState(null);
  const [possibleMoves, setPossibleMoves] = useState([]);
  const [captureMoves, setCaptureMoves] = useState([]);
  const [forcedCaptures, setForcedCaptures] = useState([]);
  const [game, setGame] = useState(null);

  const currentPlayer = game?.turn;

  useEffect(() => {
    socket.on("gameStart", ({ roomId, game }) => {
      setRoomId(roomId);
      setGame(game);
      setBoard(game.board);
    });

    socket.on("updateGame", (game) => {
      setGame(game);
      setBoard(game.board);
    });

    return () => {
      socket.off("gameStart");
      socket.off("updateGame");
    };
  }, []);

  useEffect(() => {
    if (!board.length || !currentPlayer) return;

    const caps = getAllCaptures(board, currentPlayer);
    setForcedCaptures(caps);
  }, [board, currentPlayer]);

  const click = (row, col) =>
    handleClick({
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
      socketId: socket.id
    });

  const findMatch = () => {
    socket.emit("findGame");
  };

  return {
    board,
    game,
    roomId,
    selected,
    possibleMoves,
    captureMoves,
    click,
    findMatch,
    socketId: socket.id
  };
}