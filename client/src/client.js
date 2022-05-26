const writeEvent = (text) => {
  let resultDisplay = document.querySelector("#displayText");
  resultDisplay.style.display = "flex";
  resultDisplay.innerHTML = text;
};

const decodeAction = (action) => {
  if (action.player) {
    decodePlayerAction(action);
  } else if (action.enemy) {
    decodeEnemyAction(action);
  }
};

const decodePlayerAction = (action) => {
  if (player.dead) return;

  if (action.press) {
    switch (action.key) {
      case "d":
        keys.d.pressed = true;
        player.lastKey = "d";
        break;
      case "a":
        keys.a.pressed = true;
        player.lastKey = "a";
        break;
      case "w":
        player.velocity.y = -20;
        break;
      case " ":
        player.attack();
        break;
    }
  }

  if (action.release) {
    switch (action.key) {
      case "d":
        keys.d.pressed = false;
        break;
      case "a":
        keys.a.pressed = false;
        break;
    }
  }
};

const decodeEnemyAction = (action) => {
  if (enemy.dead) return;

  if (action.press) {
    switch (action.key) {
      case "ArrowRight":
        keys.ArrowRight.pressed = true;
        enemy.lastKey = "ArrowRight";
        break;
      case "ArrowLeft":
        keys.ArrowLeft.pressed = true;
        enemy.lastKey = "ArrowLeft";
        break;
      case "ArrowUp":
        enemy.velocity.y = -20;
        break;
      case "ArrowDown":
        enemy.attack();

        break;
    }
  }

  if (action.release) {
    switch (action.key) {
      case "ArrowRight":
        keys.ArrowRight.pressed = false;
        break;
      case "ArrowLeft":
        keys.ArrowLeft.pressed = false;
        break;
    }
  }
};

function animate() {
  window.requestAnimationFrame(animate);

  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);

  background.update();
  shop.update();

  context.fillStyle = "rgba(255, 255, 255, 0.15)";
  context.fillRect(0, 0, canvas.width, canvas.height);

  player.update();
  enemy.update();

  player.velocity.x = 0;
  enemy.velocity.x = 0;

  // player movement
  if (keys.a.pressed && player.lastKey === "a") {
    player.velocity.x = -5;
    player.switchSprite("run");
  } else if (keys.d.pressed && player.lastKey === "d") {
    player.velocity.x = 5;
    player.switchSprite("run");
  } else {
    player.switchSprite("idle");
  }

  // jumping and falling
  if (player.velocity.y < 0) {
    player.switchSprite("jump");
  } else if (player.velocity.y > 0) {
    player.switchSprite("fall");
  }

  // enemy movement
  if (keys.ArrowLeft.pressed && enemy.lastKey === "ArrowLeft") {
    enemy.velocity.x = -5;
    enemy.switchSprite("run");
  } else if (keys.ArrowRight.pressed && enemy.lastKey === "ArrowRight") {
    enemy.velocity.x = 5;
    enemy.switchSprite("run");
  } else {
    enemy.switchSprite("idle");
  }

  // jumping and falling
  if (enemy.velocity.y < 0) {
    enemy.switchSprite("jump");
  } else if (enemy.velocity.y > 0) {
    enemy.switchSprite("fall");
  }

  // player attacking collision
  if (
    rectangularCollision({
      rectangle1: player,
      rectangle2: enemy,
    }) &&
    player.isAttacking &&
    player.currentFrame === 4
  ) {
    enemy.takeHit();
    player.isAttacking = false;

    document.querySelector("#enemyHealth").style.width = enemy.health + "%";
  }

  // if player misses
  if (player.isAttacking && player.currentFrame === 4) {
    player.isAttacking = false;
  }

  // enemy attacking collision
  if (
    rectangularCollision({
      rectangle1: enemy,
      rectangle2: player,
    }) &&
    enemy.isAttacking &&
    enemy.currentFrame === 2
  ) {
    player.takeHit();
    enemy.isAttacking = false;

    document.querySelector("#playerHealth").style.width = player.health + "%";
  }

  // if enemy misses
  if (enemy.isAttacking && enemy.currentFrame === 2) {
    enemy.isAttacking = false;
  }

  if (isGameOver()) {
    endGame();
    setTimeout(instantiate, 3000);
  }
}

window.addEventListener("keydown", (event) => {
  event.preventDefault();

  const playersTurn = ["a", "d", "w", " "].includes(event.key);

  sock.emit("action", {
    player: playersTurn,
    enemy: !playersTurn,
    press: true,
    release: false,
    key: event.key,
  });
});

window.addEventListener("keyup", (event) => {
  event.preventDefault();

  const playersTurn = ["a", "d", "w", " "].includes(event.key);

  sock.emit("action", {
    player: playersTurn,
    enemy: !playersTurn,
    press: false,
    release: true,
    key: event.key,
  });
});

const sock = io();
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

context.fillRect(0, 0, canvas.width, canvas.height);

canvas.width = 1024;
canvas.height = 576;

const GRAVITY = 0.7;
let background, shop, player, enemy, keys;

sock.on("message", writeEvent);
sock.on("action", decodeAction);

instantiate();
animate();
