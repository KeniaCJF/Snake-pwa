const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");

const carrotImg = new Image();
carrotImg.src = "images/Carrot.png";
const bunnyImg = new Image();
bunnyImg.src = "images/Bunny.png";

const STEP = 10;
const SIZE = 30;

let snake = [{ x: 150, y: 150 }];
let food = { x: 60, y: 60 };
let dx = STEP;
let dy = 0;
let score = 0;

function changeDirection(x, y) {
  dx = x;
  dy = y;
}

function spawnFood() {
  food = {
    x: Math.floor(Math.random() * (canvas.width / STEP)) * STEP,
    y: Math.floor(Math.random() * (canvas.height / STEP)) * STEP
  };

  // asegurar que quede completamente visible
  food.x = Math.min(food.x, canvas.width - SIZE);
  food.y = Math.min(food.y, canvas.height - SIZE);
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // mover conejo
  const head = {
    x: snake[0].x + dx,
    y: snake[0].y + dy
  };
  snake.unshift(head);

  // comer zanahoria
  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreEl.textContent = score;
    spawnFood();
  } else {
    snake.pop();
  }

  // dibujar zanahoria
  ctx.drawImage(carrotImg, food.x, food.y, SIZE, SIZE);

  // dibujar conejo
  snake.forEach(part => {
    ctx.drawImage(bunnyImg, part.x, part.y, SIZE, SIZE);
  });

  // colisiones (límite REAL del canvas)
  if (
    head.x < 0 ||
    head.y < 0 ||
    head.x > canvas.width - SIZE ||
    head.y > canvas.height - SIZE ||
    snake.slice(1).some(p => p.x === head.x && p.y === head.y)
  ) {
    alert("Game Over");
    snake = [{ x: 150, y: 150 }];
    dx = STEP;
    dy = 0;
    score = 0;
    scoreEl.textContent = score;
    spawnFood();
  }
}

document.addEventListener("keydown", e => {
  if (e.key === "ArrowUp") changeDirection(0, -STEP);
  if (e.key === "ArrowDown") changeDirection(0, STEP);
  if (e.key === "ArrowLeft") changeDirection(-STEP, 0);
  if (e.key === "ArrowRight") changeDirection(STEP, 0);
});

function directionbutton(id, x, y) {
  const btn = document.getElementById(id);
  if (!btn) return;
  btn.addEventListener("click", () => changeDirection(x, y));
}

directionbutton("up", 0, -STEP);
directionbutton("down", 0, STEP);
directionbutton("left", -STEP, 0);
directionbutton("right", STEP, 0);

// iniciar juego
spawnFood();
setInterval(draw, 100);
