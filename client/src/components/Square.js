export default function Square({
  r,
  c,
  cell,
  handleClick,
  selected,
  possibleMoves, 
  captureMoves
}) {
  const isSelected =
    selected && selected.row === r && selected.col === c;

  const isPossibleMove = possibleMoves.some(
    move => move.row === r && move.col === c);

  const isCaptureMove = captureMoves.some(
    move => move.row === r && move.col === c
  );

  return (
    <div
      onClick={() => handleClick(r, c)}
      style={{
        width: isSelected || isPossibleMove || isCaptureMove ? 56 : 60,
        height: isSelected || isPossibleMove || isCaptureMove ? 56 : 60,
        backgroundColor: (r + c) % 2 === 0 ? "#eee" : "#555",
        border: isCaptureMove 
          ? "3px solid blue"
          : isSelected
          ? "3px solid yellow"
          : isPossibleMove
          ? "3px solid lime"
          : "1px solid black",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer"
      }}
    >
      {cell && (
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: "50%",
            backgroundColor: cell
          }}
        />
      )}
    </div>
  );
}