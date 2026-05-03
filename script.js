// script.js

let randomNum = Math.floor(Math.random() * 100) + 1;

const submitBtn = document.querySelector('#submit');
const guessField = document.querySelector('#guessField'); // CORRECTED: Renamed variable for clarity
const guessesSlot = document.querySelector('.guesses');
const remaining = document.querySelector('.lastResult');
const lowOrHi = document.querySelector('.lowOrHi');
const resultDiv = document.querySelector('.result');

const p = document.createElement('p');

let prevGuess = [];
let numGuess = 1;
let playGame = true;

if (playGame) {
    submitBtn.addEventListener('click', function (e) {
        e.preventDefault();
        const guess = parseInt(guessField.value); // CORRECTED: Used the correct variable name
        validateGuess(guess);
    });
}

function validateGuess(guess) {
    if (isNaN(guess)) {
        alert('Please enter a valid number');
    } else if (guess < 1) {
        alert('Please enter a number greater than 0');
    } else if (guess > 100) {
        alert('Please enter a number smaller than 101');
    } else {
        prevGuess.push(guess);
        if (numGuess === 10) { // CORRECTED: Logic now correctly ends the game on the 10th guess
            displayGuess(guess);
            displayMsg(`Game Over. The random number was ${randomNum}`); // CORRECTED: Typo "umber"
            endGame();
        } else {
            displayGuess(guess);
            checkGuess(guess);
        }
    }
}

function checkGuess(guess) {
    if (guess === randomNum) {
        displayMsg(`Congrats! You guessed the number!`);
        endGame();
    } else if (guess < randomNum) {
        displayMsg(`Your guess is too low`);
    } else if (guess > randomNum) {
        displayMsg(`Your guess is too high`);
    }
}

function displayGuess(guess) {
    guessField.value = '';
    guessesSlot.innerHTML += `${guess}, `;
    numGuess++;
    remaining.innerHTML = `${11 - numGuess}`;
}

function displayMsg(message) { // CORRECTED: Parameter is now 'message'
    lowOrHi.innerHTML = `<h2>${message}</h2>`;
}

function endGame() {
    guessField.value = '';
    guessField.setAttribute('disabled', ''); // CORRECTED: Spelled 'disabled' correctly
    p.classList.add('button');
    p.innerHTML = `<h2 id="newGame">Start New Game</h2>`; // CORRECTED: Removed space in id
    resultDiv.appendChild(p);
    playGame = false;
    newGame();
}

function newGame() {
    const newGameButton = document.querySelector('#newGame');
    newGameButton.addEventListener('click', function () {
        randomNum = Math.floor(Math.random() * 100) + 1;
        prevGuess = [];
        numGuess = 1;
        guessesSlot.innerHTML = '';
        remaining.innerHTML = `${11 - numGuess}`;
        guessField.removeAttribute('disabled');
        resultDiv.removeChild(p);
        lowOrHi.innerHTML = ''; 
        playGame = true;
    });
}