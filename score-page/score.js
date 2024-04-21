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
retryBtn.addEventListener('click', function() {
    window.location.href = "../characters-page/characters.html"
})

// This will automatically display the saved list of users high score
scoresEl.addEventListener("click", function(){

    /* This function uses the .remove method for home, quiz, end(El) variables
     storing the id="name value" for each section in the html file 
     It also removes the contents timer and score within the container of the home page
    */
    
        modalEl.remove();
        startGameBtn.remove();
        bigScoreEl.remove();
        scoresEl.remove();
    
    /* Line 67 is displaying the score section 
       and all of its contents on the web page in the browser
    */
        scoreSectionEl.style.display = "block";
    
        getScores();
    });
    
    // Submits the users intials and scores
    submitEl.addEventListener("click", function(){
    
        scoresEl.remove();
        endEl.remove();
        scoreSectionEl.style.display = "block";
    
    // Sets the value for the text area in the section for inputting scores
        setScore();
    
    // Gets the value from the text within the scores section
        getScores();
    });
    
    // Allows the user to retry the quiz
    retryEl.addEventListener("click", function(){
    
    // reloads the location of the contents in the variable retryEl()
        location.reload();
    });
    
    // clears the scoreboard with the users saved data from the local storage
    clearEl.addEventListener("click", function(){
    
    // sets the value to a string "score history" with the value of an empty array
        localStorage.setItem("scoreHistory", "[]");
    
    // reloads the page with a cleared local storage
        location.reload();
    });
    
    // saves the users current quiz score
    function setScore(){
        let initials = inputEl.value.toUpperCase();
    
        console.log(initials);
    
    // When user doesnt enter initials, the value is then saved to "unknown" by default
    if(initials === ''){
        initials = "Unknown";
    }
    
    let scoreHistory = [];
    let newScore = {
        name: initials,
        score: score
    }
    
    let lastStorage = localStorage.getItem("scoreHistory");
    
    // If the saved local storage exists, getItem from the local storage and pass through array in scoreHistory
    if (lastStorage !== null){
        scoreHistory = JSON.parse(lastStorage);
    }
    
    // adds new score to the values of the array store in the variable scoreHistory
    scoreHistory.push(newScore);
    
    // Uses the saved data from Local storage to setItem to the string of text and using the json to turn the key/value pairs stored in the scoreHistory array into a string
    localStorage.setItem("scoreHistory", JSON.stringify(scoreHistory));
    
    console.log(scoreHistory);
    
    }
    
    // This function retrieves scores from data saveed to the local storage
    function getScores(){
    
    let scoreHistory = JSON.parse(localStorage.getItem("scoreHistory"));
    
    // This function sorts the scoreboard array by score in descending order
    scoreHistory.sort(function(a, b) {
        return b.score - a.score;
    });
    
    // Creates the HTML table to display the scores saved to the score board
    var table = document.createElement('table');
    table.id = 'table';
    var tableHead = table.createTHead();
    var headRow = tableHead.insertRow(0);
    headRow.insertCell(0).innerHTML = '<b>Name</b>';
    headRow.insertCell(1).innerHTML = '<b>Score</b>';
    
    
    // This function inserts values into the HTML table that was retrieved from the array stored in scoreHistory
    
    /* This for loop creates a var integer equal to 0, 
    creates the condition that the integer is less than the length of the array in scoreHistory,
    loop will run the code for the integer to increase by one until its larger than array.length
    */
    for (var i = 0; i < scoreHistory.length; i++) {
    
    /* this portion of the function creates the 'row' variable 
       and sets it equal to the table using  the insertRow method
       storing the value of an integer increasing by one   
    */
         var row = table.insertRow(i + 1);
    
    // These rows use the method insertcell with a value as a string property which equals the array's index stored in score history along with the name/score
         row.insertCell(0).innerHTML = scoreHistory[i].name;
         row.insertCell(1).innerHTML = scoreHistory[i].score;
    }
    
    // this will render the table by the method appendChild given the id of table in the elements of the scoreboard
    scoreboardEl.appendChild(table);
    
    }