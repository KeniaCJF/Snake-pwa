const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");
const scoreEl = document.getElementById("score");
const carrotImg = new Image();
carrotImg.src = "images/Carrot.png";
const bunnyImg = new Image();
bunnyImg.src = "images/Bunny.png";


let snake = [{ x: 150, y: 150 }];
let food = { x: 60, y: 60 };
let dx = 10;
let dy = 0;
let score = 0;

function changeDirection(x,y){
dx = x;
dy = y;
}
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);


  // Mover serpiente
  const head = { x: snake[0].x + dx, y: snake[0].y + dy };
  snake.unshift(head);

  // Comer comida
  if (head.x === food.x && head.y === food.y) {
    score++;
    scoreEl.textContent = score;
   food = {
  x: Math.floor(Math.random() * (canvas.width / 10)) * 10,
  y: Math.floor(Math.random() * (canvas.height / 10)) * 10
};

// Asegurar que no se salga del canvas
if (food.x > canvas.width - 30) {
  food.x = canvas.width - 30;
}
if (food.y > canvas.height - 30) {
  food.y = canvas.height - 30;
}

  } else {
    snake.pop();
  }

  
  // Dibujar comida
ctx.drawImage(carrotImg, food.x, food.y, 30, 30);

  // Dibujar serpiente
snake.forEach(part => {
  ctx.drawImage(bunnyImg, part.x, part.y, 30, 30);
});
  // Colisiones
  if (
    head.x < 0 || head.y < 0 ||
    head.x >= canvas.width || head.y >= canvas.height ||
    snake.slice(1).some(p => p.x === head.x && p.y === head.y)
  ) {
    alert("Game Over");
    snake = [{ x: 150, y: 150 }];
    dx = 10;
    dy = 0;
    score = 0;
    scoreEl.textContent = score;
  }
}

document.addEventListener("keydown", e => {
  if (e.key === "ArrowUp") changeDirection(0, -10);
  if (e.key === "ArrowDown") changeDirection(0, 10);
  if (e.key === "ArrowLeft") changeDirection(-10, 0);
  if (e.key === "ArrowRight") changeDirection(10, 0);
});


function directionbutton(id, x, y) {
  const btn = document.getElementById(id);
  if (!btn) return;

  btn.addEventListener("click", () => {
    changeDirection(x, y);
  });
}


directionbutton("up", 0,-10);
directionbutton("down",0,10);
directionbutton("left",-10,0);
directionbutton("right",10,0);


setInterval(draw, 100);
