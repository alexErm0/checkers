import Square from "./Square";

export default function Board({
  board,
  handleClick,
  selected,
  possibleMoves,
  captureMoves
}) {
  return (
    <>
      {board.map((row, r) => (
        <div
          key={r}
          style={{ display: "flex", justifyContent: "center" }}
        >
          {row.map((cell, c) => (
            <Square
              key={c}
              r={r}
              c={c}
              cell={cell}
              handleClick={handleClick}
              selected={selected}
              possibleMoves={possibleMoves}
              captureMoves={captureMoves}
            />
          ))}
        </div>
      ))}
    </>
  );
}