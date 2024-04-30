const retryBtn = document.getElementById("retry");

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

retryBtn.addEventListener("click", function () {
  window.location.href = "../characters-page/characters.html";
});
retryBtn.addEventListener("click", function () {
  window.location.href = "../characters-page/characters.html";
});

document.getElementById("retry").addEventListener("click", () => {
  window.location.href = "../characters-page/characters.html"; // Change this URL to the actual game page URL
});
  window.location.href = "../characters-page/characters.html"; // Change this URL to the actual game page URL
});

// This will automatically display the saved list of users high score
// scoresEl.addEventListener("click", function(){

    /* This function uses the .remove method for modalEl, startGameBtn, bigScoreEl, end(El) variables
     storing the id="name value" for each section in the html file 
     It also removes the contents startGamebtn and bigScoreEl within the container of the modalEl page
    */
    
        // modalEl.remove();
    
    /* Line 67 is displaying the score section 
       and all of its contents on the web page in the browser
    */
        // scoreSectionEl.style.display = "inline-block";
    
       
        // getScores();
        // setScores();
    // });
    
    // Submits the users intials and scores
    // submitEl.addEventListener("click", function(){
    
    //     inputEl.remove();
    //     endEl.style.display = "block";
    
    // Sets the value for the text area in the section for inputting scores
        // setScore();
    
    // Gets the value from the text within the scores section
        // getScores();
    // });
    
    // // Allows the user to retry the quiz
    // retryEl.addEventListener("click", function(){
    
    // // reloads the location of the contents in the variable retryEl()
    //     location.reload();
    // });
    
    // clears the scoreboard with the users saved data from the local storage
    // clearEl.addEventListener("click", function(){
    
    // // sets the value to a string "score history" with the value of an empty array
    //     sessionStorage.setItem("scoreHistory", "[]");
    
    // // reloads the page with a cleared local storage
    //     location.reload();
    // });
    
    // saves the users current quiz score
    
  