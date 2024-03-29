// const canvas = document.querySelector('canvas');
// const c = canvas.getContext('2d');
// const body = document.querySelector('body');

// canvas.width = innerWidth
// canvas.height = innerHeight

// let isGamePaused = false;

// const gameScreen = document.getElementById('game-screen');
// const pauseScreen = document.getElementById('pause-screen');

// window.addEventListener('keydown', async (event) => {
//     if (event.key === 'p') {
//         if (isGamePaused) {
//             await resumeGame();
//         } else {
//             await pauseGame();
//         }
//     }
// });

// function pauseGame() {
//     return new Promise((resolve) => {
//         isGamePaused = true;
//         gameScreen.classList.add('blurred');
//         pauseScreen.classList.remove('hidden');
//         resolve();
//     });
// }

// function resumeGame() {
//     return new Promise((resolve) => {
//         isGamePaused = false;
//         gameScreen.classList.remove('blurred');
//         pauseScreen.classList.add('hidden');
//         resolve();
//     });
// }