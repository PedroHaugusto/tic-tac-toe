const board = document.getElementById("board");
const status = document.getElementById("status");
const restartButton = document.getElementById("restartButton");
const winnerModal = document.getElementById("winner-modal");
const winnerMessage = document.getElementById("winner-message");
const closeModalButton = document.getElementById("close-modal");

let currentPlayer = "X";
let boardState = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], 
        [0, 3, 6], [1, 4, 7], [2, 5, 8], 
        [0, 4, 8], [2, 4, 6] 
    ];

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            return boardState[a];
        }
    }

    if (!boardState.includes("")) {
        return "T"; 
    }

    return null;
}

function updateBoard() {
    board.innerHTML = "";
    for (let i = 0; i < 9; i++) {
        const square = document.createElement("div");
        square.innerText = boardState[i];
        square.classList.add("square"); 
        square.addEventListener("click", () => makeMove(i));
        board.appendChild(square);
    }
}

function makeMove(index) {
    if (!gameOver && boardState[index] === "") {
        boardState[index] = currentPlayer;
        updateBoard();
        const winner = checkWin();

        if (winner) {
            gameOver = true;
            if (winner === "T") {
                winnerMessage.innerText = "Empate!";
            } else {
                winnerMessage.innerText = `O jogador ${winner} venceu!`;
            }
            winnerModal.style.display = "block";
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            status.innerText = `É a vez do jogador ${currentPlayer}`;
        }
    }
}

restartButton.addEventListener("click", () => {
    boardState = ["", "", "", "", "", "", "", "", ""];
    currentPlayer = "X";
    gameOver = false;
    status.innerText = "É a vez do jogador X";
    winnerModal.style.display = "none";
    updateBoard();
});

closeModalButton.addEventListener("click", () => {
    winnerModal.style.display = "none";
});

updateBoard();
status.innerText = "É a vez do jogador X";
