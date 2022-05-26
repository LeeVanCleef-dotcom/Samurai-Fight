function instantiate() {
  background = createBackground();
  shop = createShop();
  player = createPlayer();
  enemy = createEnemy();
  keys = createKeys();
}

function createBackground() {
  return new Sprite({
    position: {
      x: 0,
      y: 0,
    },
    imageSrc: "./assets/images/background.png",
  });
}

function createShop() {
  return new Sprite({
    position: {
      x: 600,
      y: 128,
    },
    imageSrc: "./assets/images/shop.png",
    scale: 2.75,
    maxFrames: 6,
  });
}

function createPlayer() {
  return new Fighter({
    position: {
      x: 100,
      y: 40,
    },
    velocity: {
      x: 0,
      y: 0,
    },
    offset: {
      x: 0,
      y: 0,
    },
    imageSrc: "./assets/images/samuraiMack/Idle.png",
    maxFrames: 8,
    scale: 2.5,
    offset: {
      x: 215,
      y: 157,
    },
    sprites: {
      idle: {
        imageSrc: "./assets/images/samuraiMack/Idle.png",
        maxFrames: 8,
      },
      run: {
        imageSrc: "./assets/images/samuraiMack/Run.png",
        maxFrames: 8,
      },
      jump: {
        imageSrc: "./assets/images/samuraiMack/Jump.png",
        maxFrames: 2,
      },
      fall: {
        imageSrc: "./assets/images/samuraiMack/Fall.png",
        maxFrames: 2,
      },
      attack1: {
        imageSrc: "./assets/images/samuraiMack/Attack1.png",
        maxFrames: 6,
      },
      takeHit: {
        imageSrc: "./assets/images/samuraiMack/Take Hit - white silhouette.png",
        maxFrames: 4,
      },
      death: {
        imageSrc: "./assets/images/samuraiMack/Death.png",
        maxFrames: 6,
      },
    },
    attackBox: {
      offset: {
        x: 100,
        y: 50,
      },
      width: 160,
      height: 50,
    },
  });
}

function createEnemy() {
  return new Fighter({
    position: {
      x: 800,
      y: 40,
    },
    velocity: {
      x: 0,
      y: 0,
    },
    color: "blue",
    offset: {
      x: -50,
      y: 0,
    },
    imageSrc: "./assets/images/kenji/Idle.png",
    maxFrames: 4,
    scale: 2.5,
    offset: {
      x: 215,
      y: 167,
    },
    sprites: {
      idle: {
        imageSrc: "./assets/images/kenji/Idle.png",
        maxFrames: 4,
      },
      run: {
        imageSrc: "./assets/images/kenji/Run.png",
        maxFrames: 8,
      },
      jump: {
        imageSrc: "./assets/images/kenji/Jump.png",
        maxFrames: 2,
      },
      fall: {
        imageSrc: "./assets/images/kenji/Fall.png",
        maxFrames: 2,
      },
      attack1: {
        imageSrc: "./assets/images/kenji/Attack1.png",
        maxFrames: 4,
      },
      takeHit: {
        imageSrc: "./assets/images/kenji/Take hit.png",
        maxFrames: 3,
      },
      death: {
        imageSrc: "./assets/images/kenji/Death.png",
        maxFrames: 7,
      },
    },
    attackBox: {
      offset: {
        x: -170,
        y: 50,
      },
      width: 170,
      height: 50,
    },
  });
}

function createKeys() {
  return {
    a: {
      pressed: false,
    },
    d: {
      pressed: false,
    },
    ArrowRight: {
      pressed: false,
    },
    ArrowLeft: {
      pressed: false,
    },
  };
}

function rectangularCollision({ rectangle1, rectangle2 }) {
  return (
    rectangle1.attackBox.position.x + rectangle1.attackBox.width >=
      rectangle2.position.x &&
    rectangle1.attackBox.position.x <=
      rectangle2.position.x + rectangle2.width &&
    rectangle1.attackBox.position.y + rectangle1.attackBox.height >=
      rectangle2.position.y &&
    rectangle1.attackBox.position.y <= rectangle2.position.y + rectangle2.height
  );
}

function isGameOver() {
  if (!player.health || !enemy.health) {
    return true;
  }

  return false;
}

function endGame() {
  let resultDisplay = document.querySelector("#resultDisplay");
  resultDisplay.style.display = "flex";

  if (player.health === enemy.health) {
    resultDisplay.textContent = "Tie";
  } else if (player.health > enemy.health) {
    resultDisplay.textContent = "Player 1 wins";
  } else {
    resultDisplay.textContent = "Player 2 wins";
  }

  document.querySelector("#displayText").style.display = "flex";
  if (player.health === enemy.health) {
    document.querySelector("#displayText").innerHTML = "Tie";
  } else if (player.health > enemy.health) {
    document.querySelector("#displayText").innerHTML = "Player 1 Wins";
  } else if (player.health < enemy.health) {
    document.querySelector("#displayText").innerHTML = "Player 2 Wins";
  }
}
