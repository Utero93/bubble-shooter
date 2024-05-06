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

document.getElementById("retry").addEventListener("click", () => {
  window.location.href = "../characters-page/characters.html"; // Change this URL to the actual game page URL
});

clearEl.addEventListener("click", function () {

  localStorage.clear();
  location.reload();
});

/*
1. RETRIEVE THE CONTENTS OF THE "scoreHistory" KEY FROM LOCAL STORAGE AND STORE IT IN THE VARIABLE "scoreboard".
2. PARSE THE "scoreboard" AS JSON AND STORE THE RESULTING ARRAY IN THE VARIABLE "scoreboardArray".
3. DISPLAY THE CONTENTS OF "scoreboardArray" IN THE CONSOLE LOG.
4. GET THE HTML ELEMENT WITH THE ID "scoretable" AND STORE IT IN THE VARIABLE "scoreTable" FOR FURTHER USE.
*/
let scoreboard = localStorage.getItem("scoreHistory");
let scoreboardArray = JSON.parse(scoreboard);
console.log(scoreboardArray);
let scoreTable = document.getElementById("scoretable");

/*
1. FOR EACH ELEMENT IN THE "scoreboardArray" ARRAY FROM THE START (INDEX 0) TO THE END, DO THE FOLLOWING STEPS:
2. CREATE A NEW HTML TABLE ROW ELEMENT USING document.createElement("tr") AND STORE IT IN THE VARIABLE "tableRow".
3. ADD A CSS CLASS "tableRow" TO THE NEWLY CREATED ROW USING tableRow.classList.add("tableRow").
4. APPEND THE ROW TO THE HTML ELEMENT WITH THE ID "scoretable" (STORED EARLIER) USING scoreTable.append(tableRow).
5. FOR EACH COLUMN IN THE CURRENT ROW, FROM INDEX 0 TO 1, DO THE FOLLOWING STEPS:
6. CREATE A NEW HTML TABLE DATA ELEMENT USING document.createElement("td") AND STORE IT IN THE VARIABLE "tableData".
7. ADD A CSS CLASS "tableData" TO THE NEWLY CREATED DATA CELL USING tableData.classList.add("tableData").
8. SET THE TEXT CONTENT OF THE DATA CELL TO THE VALUE IN THE "scoreboardArray" AT INDEX i, j USING tableData.textContent = scoreboardArray[i][j].
9. APPEND THE DATA CELL TO THE CURRENT ROW USING tableRow.append(tableData).
10. REPEAT STEPS 5-9 FOR EACH COLUMN IN THE CURRENT ROW UNTIL ALL ENTRIES IN THE "scoreboardArray" HAVE BEEN PROCESSED AND DISPLAYED IN THE HTML TABLE.
*/
for (let i = 0; i < scoreboardArray.length; i++) {

  let tableRow = document.createElement("tr");
 
  tableRow.classList.add("tableRow");
 
  scoreTable.append(tableRow);
  for (let j = 0; j < 2; j++) {

    let tableData = document.createElement("td");
  
    tableData.classList.add("tableData");
    tableData.textContent = scoreboardArray[i][j];
    
    tableRow.append(tableData);
  }
}
