let dealerCards = document.getElementById('dealer-cards')
let dealerFirst = ''
let dealerSecond = ''
let dealerSumEl = document.getElementById('dealer-icon')
let myCards = document.getElementById('my-cards')
let firstCard = ''
let secondCard = ''
let sumEl = document.getElementById('sum-el')
let mySum = 0
let dealerSum = 0
let stayBtn = document.getElementById('stay-btn')
let hitBtn = document.getElementById('hit-btn')

let hasBlackJack = false
let isAlive = false
let dealerAlive = false

let messageEl = document.getElementById('message-el')


let card_num =   [1,2,3,4,5,6,7,8,9,10,11,12,13]
let card_value = [1,2,3,4,5,6,7,8,9,10,10,10,10]
let card_suit = [
    ['<img src="ace_of_clubs.png">','<img src="ace_of_diamonds.png">','<img src="ace_of_hearts.png">','<img src="ace_of_spades2.png">'],
    ['<img src="2_of_clubs.png">','<img src="2_of_diamonds.png">','<img src="2_of_hearts.png">','<img src="2_of_spades.png">'],
    ['<img src="3_of_clubs.png">','<img src="3_of_diamonds.png">','<img src="3_of_hearts.png">','<img src="3_of_spades.png">'],
    ['<img src="4_of_clubs.png">','<img src="4_of_diamonds.png">','<img src="4_of_hearts.png">','<img src="4_of_spades.png">'],
    ['<img src="5_of_clubs.png">','<img src="5_of_diamonds.png">','<img src="5_of_hearts.png">','<img src="5_of_spades.png">'],
    ['<img src="6_of_clubs.png">','<img src="6_of_diamonds.png">','<img src="6_of_hearts.png">','<img src="6_of_spades.png">'],
    ['<img src="7_of_clubs.png">','<img src="7_of_diamonds.png">','<img src="7_of_hearts.png">','<img src="7_of_spades.png">'],
    ['<img src="8_of_clubs.png">','<img src="8_of_diamonds.png">','<img src="8_of_hearts.png">','<img src="8_of_spades.png">'],
    ['<img src="9_of_clubs.png">','<img src="9_of_diamonds.png">','<img src="9_of_hearts.png">','<img src="9_of_spades.png">'],
    ['<img src="10_of_clubs.png">','<img src="10_of_diamonds.png">','<img src="10_of_hearts.png">','<img src="10_of_spades.png">'],
    ['<img src="jack_of_clubs2.png">','<img src="jack_of_diamonds2.png">','<img src="jack_of_hearts2.png">','<img src="jack_of_spades2.png">'],
    ['<img src="queen_of_clubs2.png">','<img src="queen_of_diamonds2.png">','<img src="queen_of_hearts2.png">','<img src="queen_of_spades2.png">'],
    ['<img src="king_of_clubs2.png">','<img src="king_of_diamonds2.png">','<img src="king_of_hearts2.png">','<img src="king_of_spades2.png">'],
]

function dealerRandomCard() {
    if(dealerSum < 21) {
        let randNum = Math.floor(Math.random() * 13) + 1
        let randSuit = Math.floor(Math.random() * 4)
        for(i = 0; i < card_num.length; i++) {
            if (randNum === card_num[i]) {
                dealerCards.innerHTML += card_suit[i][randSuit]
                dealerSum += card_value[i]
                dealerSumEl.innerHTML = dealerSum
            }
        }
        }  
}

function randomCard() {
    if(isAlive === true && hasBlackJack === false) {
        let randNum = Math.floor(Math.random() * 13) +1
        let randSuit = Math.floor(Math.random() * 4)
        for(i = 0; i < card_num.length; i++) {
            if (randNum === 1 || randNum === 11) {
                aceChoiceFunc()
            }
            else if (randNum === card_num[i]) {
                myCards.innerHTML += card_suit[i][randSuit]
                mySum += card_value[i]
                sumEl.textContent = mySum
            }
        }  checkStatus()
        } 
   
}

const aceChoice = document.getElementById('ace-choice')
const aceOne = document.getElementById('one')
const aceEleven = document.getElementById('eleven')

function aceChoiceFunc() {
    aceChoice.style.visibility= 'visible'
}

aceOne.addEventListener('click', function() {
    let randSuit = Math.floor(Math.random() * 4)
    aceChoice.style.visibility= 'hidden'
    myCards.innerHTML += card_suit[0][randSuit]
    mySum += 1
    sumEl.textContent = mySum
    if (mySum === 1) {
        secondCard = randomCard()
    }
    checkStatus()
} ) ;


aceEleven.addEventListener('click', function() {
    let randSuit = Math.floor(Math.random() * 4)
    aceChoice.style.visibility= 'hidden'
    myCards.innerHTML += card_suit[0][randSuit]
    mySum += 11
    sumEl.textContent = mySum
    if (mySum === 11) {
        secondCard = randomCard()
    }
    checkStatus()
}) ;



const btn_el = document.getElementById('start-btn')
const mainEl = document.getElementById('main-sec')

btn_el.addEventListener('click', function() {
    dealerCards.innerHTML = ''
    dealerSum = 0
    myCards.innerHTML = ''
    mySum = 0
    isAlive = true
    dealerAlive = true
    firstCard = randomCard()
    secondCard = randomCard()
    dealerFirst = dealerRandomCard()
})

function checkStatus() {
    if (mySum > 21) {
        isAlive = false
        messageEl.textContent = "BUST!!!"
    } else if (mySum < 21) {
        isAlive = true
        messageEl.textContent = "Another Card?"
    } else if (mySum === 21) {
        isAlive = false
        messageEl.textContent = "BLACKJACK!"
    }
}

function stay() {
    if (isAlive === true) {
    while(dealerSum < 16 ) {
        dealerRandomCard()
    }
    checkWin()
}   
}

function checkWin() {
    let mySumDif = 21 - mySum
    let dealerSumDif = 21 - dealerSum
    isAlive = false
    if (mySumDif < dealerSumDif && dealerSum <=21) {
        messageEl.textContent = 'YOU WIN'
    } else if (mySumDif > dealerSumDif && dealerSum <=21) {
        messageEl.textContent = 'YOU LOSE'
    } else if (mySumDif === dealerSumDif && dealerSum <=21) {
        messageEl.textContent = 'DRAW'
    } else {
        messageEl.textContent = 'DEALER BUST! YOU WIN'
    }
}












