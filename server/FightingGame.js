class FightingGame {
  #players;

  constructor() {}

  #sendToPlayers(msg) {
    this.#players.forEach((player) => {
      player.emit("message", msg);
    });
  }

  setPlayers(p1, p2) {
    this.#players = [p1, p2];
  }

  start() {
    this.#sendToPlayers("Game starts!");
    setTimeout(this.#sendToPlayers.bind(this, ""), 1000);
  }

  isValidAction(action, player) {
    if (action.player && player === this.#players[0]) return true;
    if (action.enemy && player === this.#players[1]) return true;

    return false;
  }
}

module.exports = FightingGame;
