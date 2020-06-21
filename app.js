const cardImageArr = []
let clickedImage1 = ""
let clickedImage2 = ""
let divNumber = 16
let correctMatchCount = 0
let searchTerm = "bacon"
let difficulty = "easy"
let score = 0

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
        cardInnerDiv.appendChild(cardBackDiv);
        cardInnerDiv.appendChild(cardFrontDiv);
        cardOuterDiv.addEventListener("click", storeClickedImages);
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

function storeClickedImages() {
    this.classList.add("flip");
    this.classList.add("selected");
    if (clickedImage1 === "") {
        clickedImage1 = this.children[0].children[1].children[0].src;
        this.removeEventListener("click", storeClickedImages);
    }
    else if (clickedImage2 === "") {
        clickedImage2 = this.children[0].children[1].children[0].src;
        const cards = document.querySelectorAll(".card-outer");
        for (let i = 0; i < cards.length; i++) {
            cards[i].removeEventListener("click", storeClickedImages)
        }
        setTimeout(function () {
            const cards = document.querySelectorAll(".card-outer");
            for (let i = 0; i < cards.length; i++) {
                cards[i].addEventListener("click", storeClickedImages)
            }
            console.log(correctMatchCount);
            compareClickedImages()
        }, 2000);
    }

}

function compareClickedImages() {
    const selectedImages = document.querySelectorAll(".selected");
    const flipImages = document.querySelectorAll(".flip");
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
        for (i = 0; i < flipImages.length; i++) {
            flipImages[i].classList.remove("flip");
        }
    }
}

function correctMatch(selectedImages) {
    for (i = 0; i < selectedImages.length; i++) {
        correctMatchCount++;
        console.log(correctMatchCount);
        selectedImages[i].classList.add("matched");
    }
    score += 10;
    updateScore();
    gameOver();
}

function wrongMatch() {
    score -= 1;
    updateScore();
}

function gameOver() {
    if (correctMatchCount === divNumber) {
        setTimeout(function () { gameReset(); }, 2000);
    }
}

function gameReset() {
    window.location.reload(true);
}

function updateScore() {
    document.querySelector("#score").textContent = score;
}

generateColumns(divNumber);
getImages();