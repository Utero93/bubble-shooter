const homeBtn = document.getElementById('returnButton')

homeBtn.addEventListener('click', function() {
    window.location.href = "../index.html"
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