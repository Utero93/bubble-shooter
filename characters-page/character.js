const alphaShip = document.getElementById("alpha");
const betaShip = document.getElementById("beta");
const charlieShip = document.getElementById("charlie");
const deltaShip = document.getElementById("delta");
const echoShip = document.getElementById("echo");

const alphaShipBtn = document.getElementById("alpha-ship");
const betaShipBtn = document.getElementById("beta-ship");
const charlieShipBtn = document.getElementById("charlie-ship");
const deltaShipBtn = document.getElementById("delta-ship");
const echoShipBtn = document.getElementById("echo-ship");

// gets the source of the imaage, use url instead? or will run into issues with file locations
// on click, pass this information to the game and start the game with the user selected avater 
alphaShipBtn.addEventListener("click", function () {
  console.log(alphaShip.getAttribute("src"));
  window.location.href = '../index.html'
});

betaShipBtn.addEventListener("click", function () {
  console.log(betaShip.getAttribute("src"));
  // window.location.href = '../index.html'
});

charlieShipBtn.addEventListener("click", function () {
  console.log(charlieShip.getAttribute("src"));
  // window.location.href = '../index.html'
});

deltaShipBtn.addEventListener("click", function () {
  console.log(deltaShip.getAttribute("src"));
  // window.location.href = '../index.html'
});

echoShipBtn.addEventListener("click", function () {
  console.log(echoShip.getAttribute("src"));
  // window.location.href = '../index.html'
});
