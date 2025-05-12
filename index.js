const buttonEl = document.getElementById("roll-button");
const diceEl = document.getElementById("dice");
const rollHistoryEl = document.getElementById("roll-history");

let historyList = JSON.parse(localStorage.getItem("diceRollHistory")) || [];

function rollDice() {
  const rollResult = Math.floor(Math.random() * 6) + 1;
  const diceFace = getDiceFace(rollResult);
  diceEl.innerHTML = diceFace;
  historyList.push(rollResult);
  localStorage.setItem("diceRollHistory", JSON.stringify(historyList));
  updateRollHistory();
  sendRollToServer(rollResult); // Appel AJAX pour envoyer le résultat
}

function updateRollHistory() {
  rollHistoryEl.innerHTML = "";
  for (let i = 0; i < historyList.length; i++) {
    const listItem = document.createElement("li");
    listItem.innerHTML = `Roll ${i + 1}: <span>${getDiceFace(
      historyList[i]
    )}</span>`;
    rollHistoryEl.appendChild(listItem);
  }
}

function getDiceFace(rollResult) {
  switch (rollResult) {
    case 1:
      return "&#9856;";
    case 2:
      return "&#9857;";
    case 3:
      return "&#9858;";
    case 4:
      return "&#9859;";
    case 5:
      return "&#9860;";
    case 6:
      return "&#9861;";
    default:
      return "";
  }
}

// AJAX simulation: Envoi des résultats à un service distant
async function sendRollToServer(rollResult) {
  try {
    const response = await fetch("https://example.com/api/rolls", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ roll: rollResult }),
    });
    if (response.ok) {
      console.log("Roll result sent successfully!");
    } else {
      console.error("Failed to send roll result.");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

// Initialisation : Charger l'historique existant
updateRollHistory();

buttonEl.addEventListener("click", () => {
  diceEl.classList.add("roll-animation");
  setTimeout(() => {
    diceEl.classList.remove("roll-animation");
    rollDice();
  }, 1000);
});