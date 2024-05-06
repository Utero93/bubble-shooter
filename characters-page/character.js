const alphaShip = document.getElementById("alpha");
const betaShip = document.getElementById("beta");
const charlieShip = document.getElementById("charlie");
const deltaShip = document.getElementById("delta");
const echoShip = document.getElementById("echo");
const gammaShip = document.getElementById("gamma");

const alphaShipBtn = document.getElementById("alpha-ship");
const betaShipBtn = document.getElementById("beta-ship");
const charlieShipBtn = document.getElementById("charlie-ship");
const deltaShipBtn = document.getElementById("delta-ship");
const echoShipBtn = document.getElementById("echo-ship");
const gammaShipBtn = document.getElementById("gamma-ship");

const usernameModal = document.getElementById("username-modal");
const username = document.getElementById("input");
const submiteBtn = document.getElementById("submit");
const span = document.getElementsByClassName("close")[0];

/* 
1. WHEN THE SUBMIT BUTTON IS CLICKED,
2. THE VALUE ENTERED IN THE USERNAME FIELD IS SAVED IN THE BROWSER'S SESSION STORAGE UNDER THE KEY "username",
3. THE WEBPAGE IS REDIRECTED TO THE "../index.html" PAGE.

IN ESSENCE, THIS CODE SAVES THE ENTERED USERNAME AND TAKES THE USER TO THE INDEX PAGE AFTER CLICKING THE SUBMIT BUTTON.
*/
submiteBtn.addEventListener("click", function () {
  sessionStorage.setItem("username", username.value);
  window.location.href = "../index.html";
});

/*
1. WHEN THE SPAN ELEMENT IS CLICKED,
2. THE STYLE DISPLAY PROPERTY OF THE usernameModal ELEMENT IS CHANGED TO "NONE".

IN ESSENCE, THIS CODE HIDES THE usernameModal ELEMENT WHEN THE SPAN ELEMENT IS CLICKED.
*/
span.addEventListener("click", function () {
  usernameModal.style.display = "none";
});

/*
1. WHEN A CLICK EVENT OCCURS ANYWHERE IN THE WINDOW,
2. CHECK IF THE CLICKED ELEMENT IS THE usernameModal ELEMENT.
3. IF THE CLICKED ELEMENT IS usernameModal,
4. CHANGE THE STYLE DISPLAY PROPERTY OF usernameModal TO "NONE".

THIS CODE HIDES THE usernameModal ELEMENT WHEN CLICKED OUTSIDE OF IT.
*/
window.onclick = function (event) {
  if (event.target == usernameModal) {
    usernameModal.style.display = "none";
  }
};

// 1. DECLARE A VARIABLE NAMED userShip WITHOUT INITIALIZING IT.
let userShip;

/*
1. WHEN THE ALPHA SHIP BUTTON IS CLICKED:
2. GET THE SOURCE ATTRIBUTE OF THE ALPHA SHIP IMAGE.
3. REMOVE THE FIRST CHARACTER FROM THE SOURCE STRING.
4. STORE THE MODIFIED SOURCE STRING IN THE VARIABLE userShip.
5. STORE THE userShip VALUE IN THE SESSION STORAGE UNDER THE KEY "userShip".
6. DISPLAY THE USERNAME MODAL ELEMENT.
*/
alphaShipBtn.addEventListener("click", function () {
  userShip = alphaShip.getAttribute("src").slice(1);
  sessionStorage.setItem("userShip", userShip);
  usernameModal.style.display = "block";
});

betaShipBtn.addEventListener("click", function () {
  userShip = betaShip.getAttribute("src").slice(1);
  sessionStorage.setItem("userShip", userShip);
  usernameModal.style.display = "block";
});

charlieShipBtn.addEventListener("click", function () {
  userShip = charlieShip.getAttribute("src").slice(1);
  sessionStorage.setItem("userShip", userShip);
  usernameModal.style.display = "block";
});

deltaShipBtn.addEventListener("click", function () {
  userShip = deltaShip.getAttribute("src").slice(1);
  sessionStorage.setItem("userShip", userShip);
  usernameModal.style.display = "block";
});

echoShipBtn.addEventListener("click", function () {
  userShip = echoShip.getAttribute("src").slice(1);
  sessionStorage.setItem("userShip", userShip);
  usernameModal.style.display = "block";
});

gammaShipBtn.addEventListener("click", function () {
  userShip = gammaShip.getAttribute("src").slice(1);
  sessionStorage.setItem("userShip", userShip);
  usernameModal.style.display = "block";
});