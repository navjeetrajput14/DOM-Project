let randomNumber =  parseInt(Math.random()*100+1);

const submit = document.querySelector('#subt')
const userInput = document.querySelector('#guessField')
const previousGuesses = document.querySelector('.guesses')
const remaining = document.querySelector('.lastResult')
const lowOrHi = document.querySelector('.lowOrHi')
const startOver = document.querySelector('.resultParas')

const p = document.createElement('p')

let prevGuess = []
let numGuess = 1;
let playGame = true;


if(playGame){
    submit.addEventListener('click', function(e){
        e.preventDefault()
       const guess = parseInt(userInput.value); 
       console.log(guess);
       validateGuess(guess)
    });
}

function validateGuess(guess){
    if(isNaN(guess)){
        alert("Please give a valid input")
    }
    else if(guess<1){
        alert( 'PLease enter a valid input more then 1')
    }
    else if(guess>100){
        alert( 'PLease enter a valid input less then 100')
    }
    else{
        prevGuess.push(guess)
        if(numGuess===11){
            displayGuess(guess)
            displayMessage(`Game Over. Random number was ${randomNumber}`)
            endGame()
        }
        else{
            displayGuess(guess)
            checkGuess(guess)
        }
    }

}

function checkGuess(guess){

    if(guess===randomNumber){
        displayMessage(`You Guessed it right. Random number was ${randomNumber}`)
        endGame()
    }
    else if(guess>randomNumber){
        displayMessage("Number is Too High")

    }
    else if(guess<randomNumber){
        displayMessage("Number is Too Low")

    }

}

function displayGuess(guess){
    userInput.value = ''
    previousGuesses.innerHTML += `${guess}, `
    numGuess++;
    remaining.innerHTML = `${11-numGuess}`
}

function displayMessage(message){
    lowOrHi.innerHTML =`<h2>${message}</h2>`
}


function endGame(){
    userInput.value = ''
    userInput.setAttribute('disabled','')
    p.classList.add('button')
    p.innerHTML = `<h2 id ="newGame">Start New Game</h2>`
    startOver.appendChild(p);
    playGame = false; 
    newGame();
}

function newGame(){
    const newGameButton = document.querySelector('#newGame')
    newGameButton.addEventListener('click',function(){

        randomNumber = parseInt(Math.random()*100+1); 
        prevGuess = []
        numGuess = 1
        previousGuesses.innerHTML = ''
        remaining. innerHTML = `${11 - numGuess}`;
        userInput.removeAttribute('disabled');
        startOver.removeChild(p);
        playGame = true
    })
}
