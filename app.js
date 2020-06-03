// generate grid of cards instead of using divs in html
// image array
// apply images to cards in pairs
// shuffle images each time game is played
// compare clicked images
// images start as "face down"
// when clicked images become "face up"
// hide cards when correctly matched
// flip "face down" again if incorrectly matched
// game over screen when all cards have been matched
// scoring?
// difficulty adjustments?


const cardImageArr = []
let clickedImage1
let clickedImage2
let divNumber = 16

function generateColumns(divNumber) {
    const gameArea = document.getElementById("gameArea");
    for (i = 0; i < divNumber; i++) {
        const cardDiv = document.createElement("div");
        cardDiv.className = "card";
        gameArea.appendChild(cardDiv)
    }
}

generateColumns(divNumber);