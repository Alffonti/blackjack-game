// state of the game before starting the game; // declaring variables and assigning its values to 0, false or an empty string. Later a new value will be reassigned depending on the state of the game.
const player = {
    name: "Alph",
    chips: 145
}
let cards = []
let sum = 0
let hasBlackJack = false
let isAlive = false
let message = ""

const messageEl = document.getElementById("message-el") // document.querySelector("#message-el")
const sumEl = document.getElementById("sum-el") 
const cardsEl = document.getElementById("cards-el")
const playerEl = document.getElementById("player-el")
const startGameBtn = document.getElementById('start-game-btn');
const newCardBtn = document.getElementById('new-card-btn');

playerEl.textContent = player.name + ": $" + player.chips

startGameBtn.addEventListener('click', function startGame() {
    isAlive = true
    const firstCard = getRandomCard()
    const secondCard = getRandomCard()
    cards = [firstCard, secondCard]
    sum = firstCard + secondCard
    renderGame() // The 'renderGame' function renders on the page the current state of the game
})

newCardBtn.addEventListener('click', function newCard() {
    // console.log("Drawing a new card from the deck!")
    // Only allow the player to get a new card if she IS alive and does NOT have Blackjack
    if (isAlive === true && hasBlackJack === false) {
        let card = getRandomCard()
        sum += card
        cards.push(card)
        renderGame()        
    }
})

function getRandomCard() {
    // Math.random() generates a random number between 0 and 1 (not inclusive of 1) // Multiplying Math.random() by a number modify the range of the number generated // Math.floor() removes the decimals
    const randomNumber = Math.floor( Math.random()*13 ) + 1 // 1-13
    // special cases: the Ace card is just going to take 11 as a value (not 1) in this project ; J,Q,K cards takes a value of 10
    if (randomNumber > 10) {
        return 10
    } else if (randomNumber === 1) {
        return 11
    } else {
        return randomNumber
    }
}

function renderGame() {
    cardsEl.textContent = "Cards: "
    // in order to render items on an array on the page I needed to use a 'for' loop (consist of a start condition, finish condition and a step size) // the 'length' property on an array is one number larger than the final index of the array
    for (let i = 0; i < cards.length; i++) {
        cardsEl.textContent += cards[i] + " "
    }
    
    sumEl.textContent = "Sum: " + sum
    // The expression inside a conditional is translated into boolean datatype (converting it to true or false value). The condition is executed if it is true.
    if (sum <= 20) {
        message = "Do you want to draw a new card?"
    } else if (sum === 21) {
        message = "You've got Blackjack!"
        hasBlackJack = true
    } else {
        message = "You're out of the game!"
        isAlive = false
    }
    messageEl.textContent = message
}