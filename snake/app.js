const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const overlay = document.getElementById('gameOverlay');
const scoreElement = document.getElementById('score');
const highscoreElement = document.getElementById('highscore');

const GRID_SIZE = 20;
const CELL_SIZE = 20;

let snake = [{x: 10, y: 10}];
let direction = {x: 0, y: 0};
let food = {};
let score = 0;
let highscore = localStorage.getItem('snakeHighscore') || 0;
let gameRunning = false;
let gameSpeed = 100;

highscoreElement.textContent = highscore;

function setupCanvas() {
    const container = document.querySelector('.game-board');
    const maxWidth = container.clientWidth - 40;
    const maxHeight = container.clientHeight - 40;
    
    const size = Math.min(maxWidth, maxHeight, 400);
    canvas.width = size;
    canvas.height = size;
}

function drawGrid() {
    ctx.strokeStyle = '#1a1a1a';
    ctx.lineWidth = 1;
    
    const cellSize = canvas.width / GRID_SIZE;
    
    for (let i = 0; i <= GRID_SIZE; i++) {
        ctx.beginPath();
        ctx.moveTo(i * cellSize, 0);
        ctx.lineTo(i * cellSize, canvas.height);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.moveTo(0, i * cellSize);
        ctx.lineTo(canvas.width, i * cellSize);
        ctx.stroke();
    }
}

function draw() {
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    drawGrid();
    
    const cellSize = canvas.width / GRID_SIZE;
    
    ctx.fillStyle = '#ff0000';
    ctx.fillRect(food.x * cellSize + 2, food.y * cellSize + 2, cellSize - 4, cellSize - 4);
    
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? '#ffffff' : '#cccccc';
        ctx.fillRect(segment.x * cellSize + 1, segment.y * cellSize + 1, cellSize - 2, cellSize - 2);
    });
}

function update() {
    if (!gameRunning) return;
    
    const head = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};
    
    if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        gameOver();
        return;
    }
    
    for (let segment of snake) {
        if (head.x === segment.x && head.y === segment.y) {
            gameOver();
            return;
        }
    }
    
    snake.unshift(head);
    
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreElement.textContent = score;
        placeFood();
        
        if (score % 5 === 0 && gameSpeed > 50) {
            gameSpeed -= 5;
        }
    } else {
        snake.pop();
    }
    
    draw();
}

function placeFood() {
    do {
        food = {
            x: Math.floor(Math.random() * GRID_SIZE),
            y: Math.floor(Math.random() * GRID_SIZE)
        };
    } while (snake.some(segment => segment.x === food.x && segment.y === food.y));
}

function startGame() {
    snake = [{x: 10, y: 10}];
    direction = {x: 1, y: 0};
    score = 0;
    scoreElement.textContent = score;
    gameSpeed = 100;
    placeFood();
    gameRunning = true;
    overlay.classList.add('hidden');
    draw();
}

function gameOver() {
    gameRunning = false;
    
    if (score > highscore) {
        highscore = score;
        highscoreElement.textContent = highscore;
        localStorage.setItem('snakeHighscore', highscore);
    }
    
    overlay.classList.remove('hidden');
    overlay.querySelector('.overlay-title').textContent = 'GAME OVER';
    overlay.querySelector('.overlay-subtitle').textContent = `SCORE: ${score}`;
    overlay.classList.add('game-over');
}

document.addEventListener('keydown', (e) => {
    if (!gameRunning && e.code === 'Space') {
        startGame();
        return;
    }
    
    if (!gameRunning) return;
    
    switch(e.key) {
        case 'ArrowUp':
            if (direction.y === 0) {
                direction = {x: 0, y: -1};
            }
            break;
        case 'ArrowDown':
            if (direction.y === 0) {
                direction = {x: 0, y: 1};
            }
            break;
        case 'ArrowLeft':
            if (direction.x === 0) {
                direction = {x: -1, y: 0};
            }
            break;
        case 'ArrowRight':
            if (direction.x === 0) {
                direction = {x: 1, y: 0};
            }
            break;
    }
});

document.querySelectorAll('.control-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        if (!gameRunning) return;
        
        const dir = btn.dataset.dir;
        switch(dir) {
            case 'up':
                if (direction.y === 0) {
                    direction = {x: 0, y: -1};
                }
                break;
            case 'down':
                if (direction.y === 0) {
                    direction = {x: 0, y: 1};
                }
                break;
            case 'left':
                if (direction.x === 0) {
                    direction = {x: -1, y: 0};
                }
                break;
            case 'right':
                if (direction.x === 0) {
                    direction = {x: 1, y: 0};
                }
                break;
        }
    });
});

let touchStartX = 0;
let touchStartY = 0;

canvas.addEventListener('touchstart', (e) => {
    if (!gameRunning) {
        startGame();
        return;
    }
    
    touchStartX = e.touches[0].clientX;
    touchStartY = e.touches[0].clientY;
    e.preventDefault();
});

canvas.addEventListener('touchend', (e) => {
    if (!gameRunning) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    
    const dx = touchEndX - touchStartX;
    const dy = touchEndY - touchStartY;
    
    if (Math.abs(dx) > Math.abs(dy)) {
        if (dx > 30 && direction.x === 0) {
            direction = {x: 1, y: 0};
        } else if (dx < -30 && direction.x === 0) {
            direction = {x: -1, y: 0};
        }
    } else {
        if (dy > 30 && direction.y === 0) {
            direction = {x: 0, y: 1};
        } else if (dy < -30 && direction.y === 0) {
            direction = {x: 0, y: -1};
        }
    }
    
    e.preventDefault();
});

overlay.addEventListener('click', () => {
    if (!gameRunning) {
        startGame();
    }
});

window.addEventListener('resize', () => {
    setupCanvas();
    draw();
});

setupCanvas();
draw();

setInterval(update, 100);
