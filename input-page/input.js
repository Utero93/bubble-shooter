// 1. GET THE ELEMENT WITH THE ID AND STORE IT IN THE VARIABLE.

const submitBtn = document.getElementById('submitBtn');

const scoresEl = document.querySelector("#scoreEl");
const startGameBtn = document.querySelector("#startGameBtn");
const modalEl = document.querySelector("#modalEl");
const bigScoreEl = document.querySelector("#bigScoreEl");

// 1. GET THE ELEMENT WITH THE ID AND STORE IT IN THE VARIABLE.
let endEl = document.getElementById("end");
let submitEl = document.getElementById("submit");
let inputEl = document.getElementById("input");
let finalScoreEl = document.getElementById("finalscore");

// 1. GET THE ELEMENT WITH THE ID #score AND STORE IT IN THE VARIABLE scoreSectionEl.
let scoreSectionEl = document.getElementById("score");
let scoreboardEl = document.getElementById("scoreboard");
let retryEl = document.getElementById("retry");
let clearEl = document.getElementById("clear");

/*
1. ADD AN EVENT LISTENER TO THE "click" EVENT ON THE submitBtn ELEMENT.
2. WHEN THE submitBtn ELEMENT IS CLICKED, REDIRECT THE WINDOW TO THE "../score-page/score.html" PAGE.
*/
submitBtn.addEventListener('click', function() {
    window.location.href = "../score-page/score.html"
});

/*
1. GET THE ELEMENT WITH THE ID "submit" FROM THE DOCUMENT.
2. ADD AN EVENT LISTENER TO THE "click" EVENT ON THE ELEMENT.
3. WHEN THE ELEMENT IS CLICKED, REDIRECT THE WINDOW TO THE "../characters-page/characters.html" PAGE.
*/
document.getElementById("submit").addEventListener("click", () => {
    window.location.href = "../characters-page/characters.html";
  });

/*
1. ADD AN EVENT LISTENER TO THE ELEMENT WITH THE ID "scoresEl" FOR THE "click" EVENT.
2. WHEN THE ELEMENT IS CLICKED, REMOVE THE MODAL ELEMENT FROM THE DOCUMENT.
3. SET THE "display" STYLE PROPERTY OF THE "scoreSectionEl" ELEMENT TO "inline-block".
4. CALL THE FUNCTION "getScores()".
*/
scoresEl.addEventListener("click", function(){
        modalEl.remove();
        scoreSectionEl.style.display = "inline-block";
        getScores();
    });
    
/*
1. ADD AN EVENT LISTENER TO THE ELEMENT WITH THE ID "submitEl" FOR THE "click" EVENT.
2. WHEN THE ELEMENT IS CLICKED, REMOVE THE ELEMENT WITH THE ID "scoresEl" FROM THE DOCUMENT.
3. REMOVE THE ELEMENT WITH THE ID "endEl" FROM THE DOCUMENT.
4. SET THE "display" STYLE PROPERTY OF THE "scoreSectionEl" ELEMENT TO "block".
5. CALL THE FUNCTION "setScore()".
6. CALL THE FUNCTION "getScores()".
*/
submitEl.addEventListener("click", function(){
    
    scoresEl.remove();
    endEl.remove();
    scoreSectionEl.style.display = "block";

    setScore();
    getScores();
});


/*
1. ADD AN EVENT LISTENER TO THE ELEMENT WITH THE ID "clearEl" FOR THE "click" EVENT.
2. WHEN THE ELEMENT IS CLICKED, SET THE ITEM NAMED "scoreHistory" IN LOCAL STORAGE TO AN EMPTY ARRAY.
3. RELOAD THE CURRENT PAGE, EFFECTIVELY CLEARING THE LOCAL STORAGE AND REFRESHING THE PAGE.
*/
clearEl.addEventListener("click", function(){


    localStorage.setItem("scoreHistory", "[]");
    location.reload();
});

/*
1. GET THE VALUE OF THE ELEMENT WITH THE ID "inputEl" AND CONVERT IT TO UPPERCASE, THEN STORE IT IN THE VARIABLE "initials".
2. CHECK IF THE "initials" VALUE IS EMPTY. IF IT IS, SET "Unknown" AS THE VALUE OF "initials".
3. DECLARE AN EMPTY ARRAY NAMED "scoreHistory" AND CREATE A NEW OBJECT "newScore" WITH "name" SET TO "initials" AND "score" FROM AN EXISTING VARIABLE.
4. RETRIEVE THE CONTENTS OF "scoreHistory" FROM LOCAL STORAGE AND PARSE IT AS JSON IF IT IS NOT NULL.
5. ADD THE "newScore" OBJECT TO "scoreHistory" ARRAY.
6. STORE THE UPDATED "scoreHistory" BACK INTO LOCAL STORAGE AFTER CONVERTING IT TO A STRING.
7. LOG THE CONTENTS OF "scoreHistory" TO THE CONSOLE FOR REFERENCE.
*/
function setScore(){
    let initials = inputEl.value.toUpperCase();

    console.log(initials);

if(initials === ''){
    initials = "Unknown";
}

let scoreHistory = [];
let newScore = {
    name: initials,
    score: score
}

let lastStorage = localStorage.getItem("scoreHistory");

if (lastStorage !== null){
    scoreHistory = JSON.parse(lastStorage);
}
scoreHistory.push(newScore);
localStorage.setItem("scoreHistory", JSON.stringify(scoreHistory));

console.log(scoreHistory);

};

/*
1. RETRIEVE THE CONTENTS OF "scoreHistory" FROM LOCAL STORAGE AND PARSE IT AS JSON. STORE THE RESULT IN THE VARIABLE "scoreHistory".
2. SORT THE "scoreHistory" ARRAY IN DESCENDING ORDER BASED ON THE SCORE PROPERTY OF OBJECTS INSIDE.
3. CREATE A NEW HTML TABLE ELEMENT AND ASSIGN AN ID "table" TO IT.
4. CREATE THE HEADER OF THE TABLE AND ADD A ROW WITH TWO CELLS FOR LABELING THE COLUMNS: "Name" AND "Score". MAKE THE LABELS BOLD.
5. THE FUNCTION DOES NOT ADD THE SCORE DATA TO THE TABLE, SO IT ONLY SETS UP THE STRUCTURE FOR DISPLAYING SCORES.
*/
function getScores(){

let scoreHistory = JSON.parse(localStorage.getItem("scoreHistory"));


scoreHistory.sort(function(a, b) {
    return b.score - a.score;
});


var table = document.createElement('table');
table.id = 'table';
var tableHead = table.createTHead();
var headRow = tableHead.insertRow(0);
headRow.insertCell(0).innerHTML = '<b>Name</b>';
headRow.insertCell(1).innerHTML = '<b>Score</b>';
};