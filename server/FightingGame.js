class FightingGame {
  #players;

  constructor(p1, p2) {
    this.#players = [p1, p2];

    this.#sendToPlayers("Game starts!");
    setTimeout(this.#sendToPlayers.bind(this, ""), 1000);
  }

  #sendToPlayers(msg) {
    this.#players.forEach((player) => {
      player.emit("message", msg);
    });
  }
}

module.exports = FightingGame;
