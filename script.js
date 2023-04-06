class Tile {
    constructor(imageNumber) {
        this.imageNumber = imageNumber;
    }

    element() {
        let questionMark = document.createElement("img");
        questionMark.src = "images/question_mark.png";

        let tileFront = document.createElement("div");
        tileFront.className = "tile-front";
        tileFront.appendChild(questionMark);

        let catImg = document.createElement("img");
        catImg.src = "images/" + this.imageNumber + ".png";
        catImg.id = this.imageNumber;

        let tileBack = document.createElement("div");
        tileBack.className = "tile-back";
        tileBack.appendChild(catImg);

        let tile = document.createElement("div");
        tile.className = "tile";
        tile.appendChild(tileFront);
        tile.appendChild(tileBack);

        tile.addEventListener("click", function() {tileClicked(this);})

        let container = document.createElement("div");
        container.className = "tile-container";
        container.appendChild(tile);

        return container;
    }
}

var startTime, currentTime, timeIntervalID;

function updateScore() {
    currentTime = new Date();
    let timePassed = new Date(currentTime - startTime);
    timePassed.setHours(timePassed.getHours() - 1);
    document.getElementById("score").innerHTML = timePassed.toTimeString().split(' ')[0];
}

function updateHighscore() {
    let highscore = document.cookie.split(";").find((row) => row.startsWith("highscore="))?.split("=")[1];

    if (highscore) {
        document.getElementById("highscore").innerHTML = highscore;
    } else {
        document.cookie = "highscore=00:00:00";
    }
}

function animateHighscore() {
    document.getElementById("highscore-container").classList.toggle("animated");
    setTimeout(function () {
        document.getElementById("highscore-container").classList.toggle("animated");
    }, 800);
}

function checkIfEnded() {
    if (document.getElementsByClassName("tile").length <= 0) {
        clearInterval(timeIntervalID);

        let board = document.getElementById("board");
        board.innerHTML = '<div id="start-container"><button onclick="initialize(18)">Start</button></div>';
    
        let highscore = document.cookie.split(";").find((row) => row.startsWith("highscore="))?.split("=")[1]
        let currentscore = document.getElementById("score").innerHTML;
        if (currentscore < highscore) {
            let expires = new Date();
            expires.setMonth(expires.getMonth() + 1);
            document.cookie = "highscore=" + currentscore + ";expires=" + expires;

            updateHighscore();
            window.scrollTo(0,0);
            animateHighscore();
        }
    }
}

function tileClicked(tile) {
    let allTilesClicked = document.getElementsByClassName("tile-transform");
    if (allTilesClicked.length < 2) {
        tile.classList.toggle("tile-transform");

        allTilesClicked = Array.from(document.getElementsByClassName("tile-transform"));

        if (allTilesClicked.length >= 2) {
            let board = document.getElementById("board");
            board.classList.toggle("not-clickable");

            setTimeout(function () {
                if (allTilesClicked[0].lastChild.firstChild.id == allTilesClicked[1].lastChild.firstChild.id) {
                    allTilesClicked.forEach(element => {
                        element.remove();
                        checkIfEnded();
                    });
                } else {
                    allTilesClicked.forEach(element => {
                        element.classList.toggle("tile-transform");
                    });
                }
                board.classList.toggle("not-clickable");
            }, 800);
        }
    }
}

function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }
  
    return array;
}

function initialize(size) {
    let board = document.getElementById("board");
    board.innerHTML = "";
    
    let selectedImages = [];
    let tiles = [];
    while (selectedImages.length != size) {
        let random = Math.floor(Math.random() * size) + 1;
        if (!selectedImages.includes(random)) {
            selectedImages.push(random);
            let tile = new Tile(random);
            tiles.push(tile);
            tiles.push(tile);
        }
    }

    tiles = shuffle(tiles);

    for (let i = 0; i < tiles.length; i++) {
        if ((i % 6) == 0) {
            let row = document.createElement("div");
            row.className = "row";
            board.appendChild(row);
        }
        board.lastChild.appendChild(tiles[i].element());
    }

    document.getElementById("score-container").scrollIntoView(true);

    startTime = new Date();
    currentTime = new Date();
    timeIntervalID = setInterval(function() {updateScore();}, 1000);
}

updateHighscore();