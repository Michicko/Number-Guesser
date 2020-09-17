const minNum = document.querySelector('.min-num');
const maxNum = document.querySelector('.max-num');
const guessInput = document.querySelector('#guess-input');
const guessBtn = document.querySelector('#guess-btn');


const minMax = {
    min: 1,
    max: 10
}

let guessesLeft = 3;
minNum.textContent = minMax.min;
maxNum.textContent = minMax.max;

// Event listeners
guessBtn.addEventListener('click', checkGuess);
guessInput.addEventListener('keydown', start);
guessBtn.addEventListener('mousedown', restartGame);

// starte game On Enter 
function start(e) {
    if (e.keyCode === 13 || e.key === 'Enter') {
        checkGuess();
    }
}

// start game
function checkGuess(e) {
    if (isNaN(guessInput.value) || guessInput.value < minMax.min || guessInput.value > minMax.max) {
        showAlert(`Enter a number between ${minMax.min} and ${minMax.max}`, 'error');
    } else {
        const guess = parseInt(guessInput.value);
        const pickedNum = getRandomNumber(minMax.min, minMax.max);

        // If guess is correct
        if (guess === pickedNum) {
            gameOver(true, `${guess} is Correct, You win!!`);
        } else {
            // if guess is wrong remove from guessesleft
            guessesLeft--;
            showAlert(`${guess} is wrong, Try again!!`, 'error');

            // If guessesleft is zero
            if (guessesLeft === 0) {
                gameOver(false, `Game over, You lost!! The correct number is ${pickedNum}`);
            }
        }
    }
    guessInput.value = '';
    guessInput.focus();
}

// Game over
function gameOver(won, msg) {
    const className = won === true ? 'success' : 'error';
    const color = won === true ? '#5cb85c' : '#d9534f'
    showAlert(msg, className);
    guessInput.style.borderColor = color;
    guessInput.disabled = true;
    guessBtn.value = 'Play again';
    guessBtn.removeEventListener('click', checkGuess);
    guessBtn.className = 'play-again';
}

// restart game
function restartGame(e) {
    const message = document.querySelector('.message');
    if (e.target.className === 'play-again') {
        guessInput.style.borderColor = "#D1D1D1";
        guessInput.disabled = false;
        message.firstChild.remove();
        message.classList.remove('error','success');
        guessesLeft = 3;
        guessBtn.value = 'Submit';
        guessBtn.classList.remove('play-again');
        setTimeout(function () {
            guessBtn.addEventListener('click', checkGuess);
            guessInput.focus();
        }, 500);   
    }
}

// show alert
function showAlert(msg, className) {
    const message = document.querySelector('.message');
    message.className += ` ${className}`;
    if (message.firstChild) {
        message.firstChild.remove();
    }
    message.appendChild(document.createTextNode(msg));
}

// Get random number
function getRandomNumber(min, max) {
    return Math.floor(Math.random() * max + min);
}