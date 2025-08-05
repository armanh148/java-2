const dino = document.getElementById('dino');
const cactus = document.getElementById('cactus');
const scoreElement = document.getElementById('score');
const gameOverElement = document.getElementById('gameOver');

let isJumping = false;
let isAlive = true;
let score = 0;

document.addEventListener("keydown", function (e) {
    if (e.code === "Space" && !isJumping && isAlive) {
        jump();
    }
});

function jump() {
    isJumping = true;
    dino.classList.add("jump");
    setTimeout(function () {
        dino.classList.remove("jump");
        isJumping = false;
    }, 500);
}

function checkCollision() {
    if (!isAlive) return;

    const dinoRect = dino.getBoundingClientRect();
    const cactusRect = cactus.getBoundingClientRect();

    if (
        dinoRect.left < cactusRect.right &&
        dinoRect.right > cactusRect.left &&
        dinoRect.bottom > cactusRect.top
    ) {
        gameOver();
    } else {
        score++;
        scoreElement.textContent = `Score: ${Math.floor(score / 10)}`;
    }
}

function gameOver() {
    isAlive = false;
    gameOverElement.style.display = "block";
    cactus.style.animation = "none";
    cactus.style.right = window.getComputedStyle(cactus).getPropertyValue("right");
}

const gameLoop = setInterval(checkCollision, 50);
 