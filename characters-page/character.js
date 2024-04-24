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

const username = document.getElementById("input");

let userShip


// gets the source of the imaage, use url instead? or will run into issues with file locations
// on click, pass this information to the game and start the game with the user selected avater
// on click, pass this information to the game and start the game with the user selected avater
alphaShipBtn.addEventListener("click", function () {
  // gets the path of the image and slices the first period for the right location relative to the index.js
  userShip = alphaShip.getAttribute("src").slice(1);
  userShip = alphaShip.getAttribute("src").slice(1);
  // stores the variable in the session
  // if user chooses a different ship then it will overwrite the previous ship
  sessionStorage.setItem("userShip", userShip);
  usernameModal.style.display = "block";
  sessionStorage.setItem("userShip", userShip);
  usernameModal.style.display = "block";
});

betaShipBtn.addEventListener("click", function () {
  userShip = betaShip.getAttribute("src").slice(1);
  sessionStorage.setItem("userShip", userShip);
  usernameModal.style.display = "block";
  userShip = betaShip.getAttribute("src").slice(1);
  sessionStorage.setItem("userShip", userShip);
  usernameModal.style.display = "block";
});

charlieShipBtn.addEventListener("click", function () {
  userShip = charlieShip.getAttribute("src").slice(1);
  sessionStorage.setItem("userShip", userShip);
  usernameModal.style.display = "block";
  userShip = charlieShip.getAttribute("src").slice(1);
  sessionStorage.setItem("userShip", userShip);
  usernameModal.style.display = "block";
});

deltaShipBtn.addEventListener("click", function () {
  userShip = deltaShip.getAttribute("src").slice(1);
  sessionStorage.setItem("userShip", userShip);
  usernameModal.style.display = "block";
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
  userShip = gammaShip.getAttribute("src").slice(1)
  sessionStorage.setItem('userShip', userShip)
  window.location.href = '../index.html'
});