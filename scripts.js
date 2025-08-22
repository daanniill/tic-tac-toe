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
                    if (gameBoard[i][j] === '' && curPlayer === mark) {
                        gameBoard[i][j] = curMark;
                        displayBoard();
                        console.log(gameBoard)

                        // Switch turn to computer
                        curPlayer = computerMark;
                        compMove();
                    }
                })
            });
        });
    };

    const compMove = () => {
        let bestScore = -Infinity;
        let move;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++)
            {
                if (gameBoard[i][j] === '') {
                    gameBoard[i][j] = computerMark
                    let score = minimax(gameBoard)
                    gameBoard[i][j] = ''
                    if (score > bestScore) {
                        bestScore = score;
                        move = {i, j}
                    }
                }
            }
        }
        if (move) {
            gameBoard[move.i][move.j] = computerMark;
            curPlayer = mark; // give turn back to human
            displayBoard();
        }
    }

    function minimax(board) {
        let result = checkWinner()
        console.log(result)
        return 1;
    }

    function checkWinner() {
        let winner = null;

        // horizontal check
        for (let i = 0; i < 3; i++) {
            if (gameBoard[i][0] === gameBoard[i][1] && gameBoard[i][1] === gameBoard[i][2]) {
                winner = gameBoard[i][0]
            }
        }

        // vertical check
        for (let i = 0; i < 3; i++) {
            if (gameBoard[0][i] === gameBoard[1][i] && gameBoard[1][i] === gameBoard[2][i]) {
                winner = gameBoard[0][i]
            }
        }

        // diagonal check
        if (gameBoard[0][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[2][2]) {
            winner = gameBoard[0][0]
        }
        if (gameBoard[2][0] === gameBoard[1][1] && gameBoard[1][1] === gameBoard[0][2]) {
            winner = gameBoard[2][0]
        }

        let openSpots = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (gameBoard[i][j] == '') {
                    openSpots++;
                }
            }
        }

        if (winner == null && openSpots == 0) {
            return 'tie';
        } else {
            return winner;
        }
    }

    const runGame = () => {
        createBoard();
        humanMove(mark);
        displayBoard();
    };

    return {runGame}

})(mark);

Game.runGame()