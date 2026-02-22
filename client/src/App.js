import Board from "./components/Board";
import GameInfo from "./components/GameInfo";
import useGame from "./hooks/useGame";

function App() {
  const {
    board,
    game,
    roomId,
    selected,
    possibleMoves,
    captureMoves,
    click,
    findMatch,
    socketId
  } = useGame();

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Online Checkers</h1>

      <GameInfo game={game} socketId={socketId} />

      {!roomId && (
        <button onClick={findMatch}>
          Find Match
        </button>
      )}

      <Board
        board={board}
        handleClick={click}
        selected={selected}
        possibleMoves={possibleMoves}
        captureMoves={captureMoves}
      />
    </div>
  );
}

export default App;