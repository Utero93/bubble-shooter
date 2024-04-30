const submitBtn = document.getElementById('submit')

const scoresEl = document.querySelector("#scoreEl");
const startGameBtn = document.querySelector("#startGameBtn");
const modalEl = document.querySelector("#modalEl");
const bigScoreEl = document.querySelector("#bigScoreEl");

// Variables for end game, input username 
let endEl = document.getElementById("end");
let submitEl = document.getElementById("submit");
let inputEl = document.getElementById("input");
let finalScoreEl = document.getElementById("finalscore");

// Variables for the scoreboard section
let scoreSectionEl = document.getElementById("score");
let scoreboardEl = document.getElementById("scoreboard");
let retryEl = document.getElementById("retry");
let clearEl = document.getElementById("clear");

submitBtn.addEventListener('click', function() {
    window.location.href = "../characters-page/characters.html"
})

document.getElementById("submit").addEventListener("click", () => {
    window.location.href = "../characters-page/characters.html"; // Change this URL to the actual game page URL
  });
