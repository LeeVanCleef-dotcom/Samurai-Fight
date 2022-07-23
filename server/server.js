const http = require("http");
const express = require("express");
const socketio = require("socket.io");

const FightingGame = require("./FightingGame");

const app = express();

const clientPath = `${__dirname}/../client`;
app.use(express.static(clientPath));
console.log(`Serving static from ${clientPath}`);

const server = http.createServer(app);
const io = socketio(server);

let waitingPlayer = null;
let game = new FightingGame();

io.on("connection", (sock) => {
  // start the game
  if (waitingPlayer) {
    game.setPlayers(waitingPlayer, sock);
    game.start();
    waitingPlayer = null;
  } else {
    waitingPlayer = sock;
    waitingPlayer.emit("message", "Waiting for an opponent...");
  }

  sock.on("message", (text) => {
    io.emit("message", text);
  });

  sock.on("action", (action) => {
    if (game.isValidAction(action, sock)) io.emit("action", action);
  });
});

server.on("error", (err) => {
  console.log("Server error:", err);
});

server.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
