// image array
// apply images to cards in pairs
// get images from api
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
let searchTerm = "bacon"

function generateColumns(divNumber) {
    const gameArea = document.getElementById("gameArea");
    for (i = 0; i < divNumber; i++) {
        const cardDiv = document.createElement("div");
        cardDiv.className = "card";
        gameArea.appendChild(cardDiv)
    }
}

function getImages() {
    $.ajax({
        url: "//api.giphy.com/v1/gifs/search?q="
            + searchTerm
            + "&limit="
            + divNumber / 2
            + "&api_key=W5rOVNC5OWIuMkDJ3o5vDoDBxFuqcCv7",
        success: function (res) {
            addImagesToArray(res)
        }
    });
}

function addImagesToArray(response) {
    console.log(response);
    for (i = 0; i < divNumber / 2; i++) {
        cardImageArr.push(response.data[i].images.looping.mp4)
    }
    console.log(cardImageArr)
}

generateColumns(divNumber);
getImages();