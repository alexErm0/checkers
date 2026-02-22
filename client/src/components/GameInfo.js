export default function GameInfo({ game, socketId }) {
  if (!game || !game.players) return null;

  return (
    <>
      <h2>
        {game.players.red === socketId
          ? "You are playing 🔴 Red"
          : game.players.black === socketId
          ? "You are playing ⚫ Black"
          : "Waiting for players..."}
      </h2>

      <h3>
        {game.turn === "red"
          ? "🔴 Red's Turn"
          : "⚫ Black's Turn"}
      </h3>
    </>
  );
}