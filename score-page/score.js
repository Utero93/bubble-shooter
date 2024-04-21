const homeBtn = document.getElementById('returnButton')

homeBtn.addEventListener('click', function() {
    window.location.href = "../index.html"
})

document.getElementById("retry").addEventListener("click", () => {
    window.location.href = "../characters-page/characters.html"; // Change this URL to the actual game page URL
  });