// Create variables for the game state
let player1 = {
    "score": 0,
    "roundsWon": 0,
    "isTurn": true
}

let player2 = {
    "score": 0,
    "roundsWon": 0,
    "isTurn": false
}

let currentRound = 1;
// Create variables to store references to the necessary DOM nodes
const diceP1 = document.querySelectorAll('.dieP1');
const diceP2 = document.querySelectorAll('.dieP2');
const roundEl = document.getElementById('round');
const player1Scoreboard = document.getElementById("player1Scoreboard");
const player2Scoreboard = document.getElementById("player2Scoreboard");
const message = document.getElementById("message");
const rollBtn = document.getElementById("rollBtn");
const newRoundBtn = document.getElementById('newRoundBtn');
const resetBtn = document.getElementById("resetBtn");

function showResetButton() {
    rollBtn.style.display = "none"
    resetBtn.style.display = "block"
}

/* Hook up a click event listener to the Roll Dice Button. */
 rollBtn.addEventListener("click", function() {
    const randomNumber = Math.floor(Math.random() * 6) + 1;

    if (player1.isTurn) {
        player1.score += randomNumber;
        player1Scoreboard.textContent = player1Score;
        displayDie(randomNumber);
        diceP1[randomNumber - 1].classList.add('res')
        player1Dice.classList.remove("active")
        player2Dice.classList.add("active")
        message.textContent = "Player 2 Turn"
    } else {
        player2.score += randomNumber
        player2Scoreboard.textContent = player2Score
        displayDie(randomNumber);
        diceP2[randomNumber - 1].classList.add('res')
        player2Dice.classList.remove("active")
        player1Dice.classList.add("active")
        message.textContent = "Player 1 Turn"
    }
    
    checkForWinner();
    player1.Turn = !player1Turn
})
 
resetBtn.addEventListener("click", function(){
    reset()
})

function reset() {
    player1.score = 0;
    player2.score = 0;
    player1.isTurn = true;
    player2.isTurn = false;
    player1Scoreboard.textContent = 0;
    player2Scoreboard.textContent = 0;
    message.textContent = "Player 1 Turn";
    resetBtn.style.display = "none";
    rollBtn.style.display = "block";
    player2Dice.classList.remove("active");
    player1Dice.classList.add("active");
}


function displayDie() {
    for (let die of diceP1) {
        die.classList.remove('res');
    }
    for (let die of diceP2) {
        die.classList.remove('res')
    }
}

function checkForWinner() {
    console.log('working 1')
    if (player1Score >= 20 && currentRound === 1) {
        message.textContent = "Player 1 won round 1";
        player1.roundsWon += 1;
        currentRound++;
        showNewRoundButton();
        console.log('working 2')
    }  else if (player2Score >= 20 && currentRound === 1) {
        message.textContent = "Player 2 won round 1";
        player2.roundsWon += 1;
        showNewRoundButton();
        currentRound++;
        console.log('working 3')
    }
    
    if (currentRound >= 2 && player1.roundsWon > player2.roundsWon) {
        message.textContent = "Player 1 has won! 🥳";
        showResetButton();
    } else if (currentRound >= 2 && player2.roundsWon > player1.roundsWon) {
        message.textContent = "Player 2 has won! 🎉";
        showResetButton();
    }
}

newRoundBtn.addEventListener('click', startNewRound);

function showNewRoundButton() {
    rollBtn.style.display = "none";
    newRoundBtn.style.display = "block";
}

function startNewRound() {
    player1.score = 0;
    player2.score = 0;
    player1.isTurn = false;
    player2.isTurn = true;
    player1Scoreboard.textContent = 0;
    player2Scoreboard.textContent = 0;
    message.textContent = "Player 2 Turn";
    rollBtn.style.display = "block";
    player1Dice.classList.remove("active");
    player2Dice.classList.add("active");
}