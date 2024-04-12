const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    //UI BOXES KO EMPTY
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        box.classList = `box box${index + 1}`;
    });

    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn() {
    if (currentPlayer === "X") {
        currentPlayer = "O";
    } else {
        currentPlayer = "X";
    }
    ///Current player on UI
    gameInfo.innerText = `Curret Player -${currentPlayer}`;
}

function checkGameOver() {
    let answer = "";
    winningPositions.forEach((positiion) => {
        // all three boxes should be non empty and they should be equal
        if (gameGrid[positiion[0]] !== "" && gameGrid[positiion[1]] !== "" && gameGrid[positiion[2]] !== "" && gameGrid[positiion[0]] === gameGrid[positiion[1]] && gameGrid[positiion[1]] === gameGrid[positiion[2]]) {
            //check if winner is X
            if (gameGrid[positiion[1]] == "X") {
                answer = "X";
            } else {
                answer = "O";
            }

            //disable pointer events
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            });
            //fill with win class
            boxes[positiion[0]].classList.add("win");
            boxes[positiion[1]].classList.add("win");
            boxes[positiion[2]].classList.add("win");
        }
    });
    //
    if (!answer == "") {
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }
    //lets check if there is a tie
    let fillCount = 0;
    boxes.forEach((box) => {
        if (box != "") {
            fillCount++;
        }
    });
    if (fillCount == 9) {
        gameInfo.innerText = "Game tied";
        newGameBtn.classList.add("active");
    }
}

function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        //swap the current player
        swapTurn();
        //check if won
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    });
});

newGameBtn.addEventListener("click", initGame);
