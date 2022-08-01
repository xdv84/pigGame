'use strict';

// Total score
const getTotalScore0 = document.getElementById('score--0')
const getTotalScore1 = document.getElementById('score--1')
getTotalScore0.textContent = 0
getTotalScore1.textContent = 0

// Current score
let getCurrentScore = 0
const totalScore = [0, 0]

//Buttons
const btnNewGame = document.querySelector('.btn--new')
const btnRollDice = document.querySelector('.btn--roll')
const btnHold = document.querySelector('.btn--hold')

// Dice
const viewDice = document.querySelector('.dice')

// Player
const player0 = document.querySelector('.player--0')
const player1 = document.querySelector('.player--1')
let activePlayer = 0
let playing = true

const switchPlayer = () => {
  document.getElementById(`current--${activePlayer}`).textContent = 0
  getCurrentScore = 0
  activePlayer = activePlayer === 0 ? 1 : 0
  player0.classList.toggle('player--active')
  player1.classList.toggle('player--active')
}

btnRollDice.addEventListener('click', function () {
  if (playing) {
  // 1. Generating a random dice roll
  let getDiceNumber = Math.trunc(Math.random()  * 6) + 1
  
  // 2. Display dice
  viewDice.classList.remove('hidden')
  viewDice.src = `dice-${getDiceNumber}.png`
  
  // 3. Check for rolled 1, if true, switch to the next player
  if (getDiceNumber !== 1) {
    getCurrentScore += getDiceNumber
    document.getElementById(`current--${activePlayer}`).textContent = getCurrentScore
  } else {
    switchPlayer()
  }
  }
})

btnHold.addEventListener('click', function () {
  // 1. Add current score to active player's score
  if (playing) {
    totalScore[activePlayer] += getCurrentScore
    document.getElementById(`score--${activePlayer}`).textContent = totalScore[activePlayer]
    // 2. Check if player's score is >= 100
    if (totalScore[activePlayer] >= 10) {
      viewDice.classList.add('hidden')
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner')
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active')
      document.getElementById(`name--${activePlayer}`).textContent = 'You win'
      playing = false
    } else {
      // 3. Switch to the next player
      switchPlayer()
    }
  }
})

btnNewGame.addEventListener('click', function () {
  playing = true
  document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner')
  activePlayer = 0
  document.getElementById(`name--${activePlayer}`).textContent = `Player ${activePlayer + 1}`
  document.querySelector(`.player--${activePlayer}`).classList.add('player--active')
  getCurrentScore = 0
  document.getElementById('current--0').textContent = 0
  document.getElementById('current--1').textContent = 0
  document.getElementById('score--0').textContent = 0
  document.getElementById('score--1').textContent = 0
  totalScore[0] = 0
  totalScore[1] = 0
})


