const retryBtn = document.getElementById('retry')

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

retryBtn.addEventListener('click', function() {
    window.location.href = "../characters-page/characters.html"
})

document.getElementById("retry").addEventListener("click", () => {
    window.location.href = "../characters-page/characters.html"; // Change this URL to the actual game page URL
  });

document.addEventListener("DOMContentLoaded", function () {
    // -------======= IT GETS THE ELEMENT WITH THE ID "retry" -------======= \\
    var returnButton = document.getElementById("retry");
  
    // -------======= ADDS AN EVENT LISTENER TO IT FOR THE CLICK EVENT. -------======= \\
returnButton.addEventListener("click", function () {
      // -------=======  WHEN THE BUTTON IS CLICKED, IT REDIRECTS THE PAGE TO "characters.html". -------======= \\
      window.location.href = "../characters-page/characters.html";
    });
})