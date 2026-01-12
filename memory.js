let wordPool = [
    "inevitable",
    "significant",
    "consequence",
    "controversial",
    "phenomenon",
    "conservative"
];

let sequence = [];
let showSequence = [];
let level = 0;
let currentIndex = 0;

const display = document.getElementById("display");
const instruction = document.getElementById("instruction");
const levelText = document.getElementById("level");

function startGame() {
    instruction.innerText = "Memorize the words...";
    addWord();
    prepareRound();
    currentIndex = 0;
    displayNextWord();
}

function addWord() {
    let randomIndex = Math.floor(Math.random() * wordPool.length);
    let newWord = wordPool[randomIndex];

    if (sequence.indexOf(newWord) === -1) {
        sequence.push(newWord);
        level = sequence.length;
        levelText.innerText = level;
    } else {
        addWord();
    }
}

function prepareRound() {
    showSequence = sequence.concat();

    for (let i = showSequence.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let temp = showSequence[i];
        showSequence[i] = showSequence[j];
        showSequence[j] = temp;
    }
}


function displayNextWord() {
    if (currentIndex < showSequence.length) {
        display.innerText = showSequence[currentIndex];
        currentIndex++;

        setTimeout(function () {
            display.innerText = "";
            setTimeout(displayNextWord, 800);
        }, 1200);

    } else {
        setTimeout(getUserInput, 500);
    }
}

function getUserInput() {
    let answer = prompt("Enter the words in order, separated by commas:");

    if (answer === null) {
        instruction.innerText = "Game cancelled.";
        return;
    }

    answer = answer.toLowerCase().replace(/\s/g, "");
    let userArray = answer.split(",");

    checkAnswer(userArray);
}

function checkAnswer(userArray) {

    if (userArray.length !== showSequence.length) {
        gameOver();
        return;
    }

    for (let i = 0; i < showSequence.length; i++) {
        if (userArray[i] !== showSequence[i]) {
            gameOver();
            return;
        }
    }

    instruction.innerText = "Correct! Next level!";
    showCelebration();
    setTimeout(startGame, 2000);
}

function gameOver() {
    instruction.innerText = "Wrong answer. Please reset.";
    sequence = [];
    showSequence = [];
    level = 0;
    levelText.innerText = level;
}

function resetGame() {
    sequence = [];
    showSequence = [];
    level = 0;
    levelText.innerText = level;
    display.innerText = "";
    instruction.innerText = "Click Start to play again.";
    document.getElementById("celebration").innerText = "";
}

function showCelebration() {
    let celebration = document.getElementById("celebration");
    celebration.innerText = "🎉 🎉 🎉";
}
