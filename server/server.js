const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");
const cors = require("cors");
const { createGame} = require("./game/gameController");
const { applyMove } = require("./game/moves");

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

app.use(express.static(path.join(__dirname, "../client/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

setInterval(() => {
  const now = Date.now();
  for (const roomId in games) {
    const game = games[roomId];
    // Delete games inactive for 5 minutes
    if (now - game.lastActive > 5 * 60 * 1000) {
      delete games[roomId];
      console.log(`Deleted inactive game: ${roomId}`);
    }
  }
}, 60 * 1000); // every 60 seconds

let queue = [];
let games = {};

io.on("connection", (socket) => {
  console.log("Connected:", socket.id);

  socket.on("findGame", () => {
    queue.push(socket);

    if (queue.length >= 2) {
      const player1 = queue.shift();
      const player2 = queue.shift();

      const roomId = player1.id + "#" + player2.id;

      player1.join(roomId);
      player2.join(roomId);

      const game = createGame(player1.id, player2.id);
      games[roomId] = game;

      io.to(roomId).emit("gameStart", {
        roomId,
        game
      });
    }
  });

  socket.on("move", ({ roomId, move }) => {
    const game = games[roomId];
    if (!game) return;
    if (!move || !move.from || !move.to) {
      return; // ignore bad request
    }

    const updatedGame = applyMove(game, move, socket.id);
    updatedGame.lastActive = Date.now();
    games[roomId] = updatedGame;

    io.to(roomId).emit("updateGame", updatedGame);
  });

  socket.on("disconnect", () => {
    queue = queue.filter(s => s.id !== socket.id);

    // Optional: delete games where both players left
    for (const roomId in games) {
      const game = games[roomId];
      const { red, black } = game.players;
      if (![red, black].includes(socket.id)) continue; // someone else
      // if both disconnected, delete
      const connectedSockets = io.sockets.adapter.rooms.get(roomId);
      if (!connectedSockets || connectedSockets.size === 0) {
        delete games[roomId];
        console.log(`Deleted game due to disconnect: ${roomId}`);
      }
    }
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log("Server running on port 5000");
});
