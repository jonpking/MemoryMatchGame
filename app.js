// images start as "face down"
// when clicked images become "face up"
// flip "face down" again if incorrectly matched
// game over screen when all cards have been matched
// scoring?
// difficulty adjustments?

const cardImageArr = []
let clickedImage1 = ""
let clickedImage2 = ""
let divNumber = 16
let searchTerm = "bacon"
let difficulty = "easy"

function generateColumns(divNumber) {
    const gameArea = document.getElementById("gameArea");
    for (i = 0; i < divNumber; i++) {
        const cardOuterDiv = document.createElement("div");
        cardOuterDiv.className = "card-outer";
        const cardInnerDiv = document.createElement("div");
        cardInnerDiv.className = "card-inner";
        const cardFrontDiv = document.createElement("div");
        cardFrontDiv.className = "card-front";
        const cardBackDiv = document.createElement("div");
        cardBackDiv.className = "card-back";
        const cardBackImg = document.createElement("img");
        cardBackImg.setAttribute("src", "images/card-back.jpg")
        switch (difficulty) {
            case "easy":
                cardOuterDiv.classList.add("easy");
                break;
            case "medium":
                cardOuterDiv.classList.add("medium");
                break;
            case "hard":
                cardOuterDiv.classList.add("hard");
                break;
        }
        cardBackDiv.appendChild(cardBackImg);
        cardInnerDiv.appendChild(cardBackDiv);
        cardInnerDiv.appendChild(cardFrontDiv);
        cardOuterDiv.appendChild(cardInnerDiv);
        gameArea.appendChild(cardOuterDiv);
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
        cardImageArr.push(response.data[i].images.original.url);
        cardImageArr.push(response.data[i].images.original.url);
    }
    displayImages();
}

function displayImages() {
    shuffleImages(cardImageArr);
    const cards = document.getElementsByClassName("card-front");
    for (i = 0; i < divNumber; i++) {
        const cardImage = document.createElement("img");
        cardImage.addEventListener("click", storeClickedImages);
        cardImage.setAttribute("src", cardImageArr[i]);
        cards[i].append(cardImage);
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

function compareClickedImages() {
    const selectedImages = document.querySelectorAll(".selected");
    if (clickedImage1 !== "" && clickedImage2 !== "") {
        if (clickedImage1 === clickedImage2) {
            correctMatch(selectedImages)
        }
        else {
            wrongMatch()
        }
        clickedImage1 = ""
        clickedImage2 = ""
        for (i = 0; i < selectedImages.length; i++) {
            selectedImages[i].classList.remove("selected");
        }
    }
}

function storeClickedImages() {
    this.classList.add("selected");
    if (clickedImage1 === "") {
        clickedImage1 = event.target.src;
    }
    else if (clickedImage2 === "") {
        clickedImage2 = event.target.src;
    }
    setTimeout(function () { compareClickedImages() }, 1000);
}

function correctMatch(selectedImages) {
    alert("CORRECT MATCH");
    for (i = 0; i < selectedImages.length; i++) {
        selectedImages[i].classList.add("matched");
    }
}

function wrongMatch() {
    alert("WRONG MATCH");
}

generateColumns(divNumber);
getImages();