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
let difficulty = "easy"

function generateColumns(divNumber) {
    const gameArea = document.getElementById("gameArea");
    for (i = 0; i < divNumber; i++) {
        const cardDiv = document.createElement("div");
        cardDiv.className = "card";
        switch (difficulty) {
            case "easy":
                cardDiv.classList.add("easy");
                break;
            case "medium":
                cardDiv.classList.add("medium");
                break;
            case "hard":
                cardDiv.classList.add("hard");
                break;
        }
        gameArea.appendChild(cardDiv);
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
            addImagesToArray(res);
        }
    });
}

function addImagesToArray(response) {
    for (i = 0; i < divNumber / 2; i++) {
        cardImageArr.push(response.data[i].images.looping.mp4);
        cardImageArr.push(response.data[i].images.looping.mp4);
    }
    displayImages();
}

function displayImages() {
    shuffleImages(cardImageArr);
    const cards = document.getElementsByClassName("card");
    for (i = 0; i < divNumber; i++) {
        const cardImage = document.createElement("video");
        const cardImageSource = document.createElement("source");
        cardImage.setAttribute("autoplay", "");
        cardImage.setAttribute("playsinline", "");
        cardImage.setAttribute("muted", "");
        cardImage.setAttribute("loop", "");
        cardImage.append(cardImageSource);
        cards[i].append(cardImage);
        cardImageSource.src = cardImageArr[i];
        switch (difficulty) {
            case "easy":
                cardImage.width = "130";
                cardImage.height = "130";
                break;
            case "medium":
                cardImage.width = "90";
                cardImage.height = "90";
                break;
            case "hard":
                cardImage.width = "75";
                cardImage.height = "75";
                break;
        }
    }
}

function shuffleImages(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

generateColumns(divNumber);
getImages();