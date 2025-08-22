let mark = 'X'

const Game = (function(mark) {
    let gameBoard = [...Array(3)].map(e => Array(3).fill(''));
    let computerMark;

    if (mark === 'X') {
        computerMark = 'O'
    }
    else {
        computerMark = 'X'
    }

    const createBoard = () => {
        const board = document.querySelector(".board")
        for (let i = 0; i < 3; i++) {
            let row = document.createElement("div")
            row.setAttribute("class", "row")
            for (let j = 0; j < 3; j++)
            {
                let box = document.createElement("div")
                box.setAttribute("class", "box")
                row.appendChild(box)
            }
            board.appendChild(row)
        }
    };

    const displayBoard = () => {
        const board = document.querySelectorAll(".row")
        board.forEach((row, i) => {
            row.querySelectorAll(".box").forEach((box, j) => {
                box.innerHTML = gameBoard[i][j]
            });
        });
    }

    const humanMove = (curMark) => {
        const board = document.querySelectorAll(".row")
        board.forEach((row, i) => {
            row.querySelectorAll(".box").forEach((box, j) => {
                box.addEventListener('click', () => {
                    if (gameBoard[i][j] ==='') {
                        gameBoard[i][j] = curMark
                    }
                    displayBoard()
                    console.log(gameBoard)
                })
            });
        });
    };

    const compMove = () => {
        
    }

    const runGame = () => {
        createBoard()
        humanMove(mark)

    };

    return {gameBoard, createBoard, displayBoard, humanMove, runGame}

})(mark);

Game.runGame()