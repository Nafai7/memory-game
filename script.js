class Tile {
    constructor(imageNumber) {
        this.imageNumber = imageNumber;
    }

    element() {
        let img = document.createElement("img");
        img.src = "images/" + this.imageNumber + ".png";

        let tile = document.createElement("div");
        tile.className = "tile";
        tile.appendChild(img);

        let container = document.createElement("div");
        container.className = "tile-container";
        container.appendChild(tile);

        return container;
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

function initilize(size) {
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
}

initilize(18);