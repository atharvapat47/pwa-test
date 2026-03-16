const scoreEl = document.getElementById("score");
const timeEl = document.getElementById("time");
const bestEl = document.getElementById("best");
const startBtn = document.getElementById("startBtn");
const resetBestBtn = document.getElementById("resetBestBtn");
const gameArea = document.getElementById("gameArea");
const blob = document.getElementById("blob");
const message = document.getElementById("message");
let score = 0;
let timeLeft = 30;
let timer = null;
let isPlaying = false;
const BEST_SCORE_KEY = "tap_blob_best";
function loadBestScore() {
 const best = localStorage.getItem(BEST_SCORE_KEY) || 0;
 bestEl.textContent = best;
}
function saveBestScore() {
 const currentBest = Number(localStorage.getItem(BEST_SCORE_KEY) || 0);
 if (score > currentBest) {
   localStorage.setItem(BEST_SCORE_KEY, score);
   bestEl.textContent = score;
 }
}
function randomColor() {
 const colors = [
   "#ff5f7a",
   "#6c63ff",
   "#00c2a8",
   "#ff9f1c",
   "#3a86ff",
   "#fb5607"
 ];
 return colors[Math.floor(Math.random() * colors.length)];
}
function moveBlob() {
 const areaRect = gameArea.getBoundingClientRect();
 const blobSize = blob.offsetWidth || 72;
 const maxX = areaRect.width - blobSize;
 const maxY = areaRect.height - blobSize;
 const x = Math.random() * maxX;
 const y = Math.random() * maxY;
 blob.style.left = `${x}px`;
 blob.style.top = `${y}px`;
 blob.style.background = `radial-gradient(circle at 30% 30%, #fff6, #0000), ${randomColor()}`;
}
function startGame() {
 score = 0;
 timeLeft = 30;
 isPlaying = true;
 scoreEl.textContent = score;
 timeEl.textContent = timeLeft;
 message.textContent = "";
 blob.classList.remove("hidden");
 moveBlob();
 clearInterval(timer);
 timer = setInterval(() => {
   timeLeft--;
   timeEl.textContent = timeLeft;
   if (timeLeft <= 0) {
     endGame();
   }
 }, 1000);
}
function endGame() {
 clearInterval(timer);
 isPlaying = false;
 blob.classList.add("hidden");
 saveBestScore();
 message.textContent = `Game over! Your score was ${score}. Press “Start Game” to play again.`;
}
blob.addEventListener("click", () => {
 if (!isPlaying) return;
 score++;
 scoreEl.textContent = score;
 moveBlob();
});
startBtn.addEventListener("click", startGame);
resetBestBtn.addEventListener("click", () => {
 localStorage.setItem(BEST_SCORE_KEY, 0);
 bestEl.textContent = 0;
});
loadBestScore();
