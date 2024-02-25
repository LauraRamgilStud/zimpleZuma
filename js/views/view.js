const gameContainer = document.getElementById("game-container");

const ballImages = [
  "images\blue-ball.png",
  "images\red-ball.png",
  "imagesgreen-ball.png",
  "imagesyellow-ball.png",
];

// Generate a random color
function getRandomColor() {
  return Math.floor(Math.random() * ballImages.length);
}

export function renderGame(gameData) {
  gameContainer.innerHTML = ""; // Clear previous game

  let currentNode = gameData.head;
  while (currentNode) {
    const ballElement = document.createElement("div");
    ballElement.classList.add("ball");
    ballElement.style.backgroundColor = currentNode.payload;
    ballElement.addEventListener("click", () => handleBallClick(currentNode));
    currentNode = currentNode.next;
  }
}

function handleBallClick(node) {
  console.log("Clicked ball: " + node.payload);
}
