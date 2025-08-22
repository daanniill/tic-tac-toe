let mark = 'X'

const Game = (function(mark) {
    let gameBoard = [...Array(3)].map(e => Array(3).fill(''));
    let computerMark;
    let curPlayer = mark;

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
                    curPlayer = computerMark;
                    compMove()
                    console.log(gameBoard)
                })
            });
        });
    };

    const compMove = () => {
        let bestScore = -Infinity;
        let bestMove;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++)
            {
                if (gameBoard[i][j] == '') {
                    gameBoard[i][j] = computerMark
                    let score = minimax(gameBoard)
                    gameBoard[i][j] = ''
                    if (score > bestScore) {
                        bestScore = score;
                        bestMove = {i, j}
                    }
                }
            }
        }
        gameBoard[bestMove.i][bestMove.j] = computerMark;
        curPlayer = mark;
    }

    function minimax(board) {
        return 1;
    }

    const runGame = () => {
        createBoard()
        if (curPlayer === mark) {
            humanMove(mark);
            curPlayer = computerMark;
            compMove();
        }
    };

    return {runGame}

})(mark);

Game.runGame()