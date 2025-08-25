let mark = 'X'
// three game states: human, ai_1 (random), ai_2 (minimax)
let state = 'ai_1'

const Game = (function(mark, state) {
    let gameBoard = [...Array(3)].map(e => Array(3).fill(''));
    let curPlayer = mark;
    let humanMark = mark;
    let computerMark = (mark === 'X') ? 'O' : 'X';
    let scores = {
        [computerMark]: 10,
        [humanMark]: -10,
        tie: 0
    };
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
            board.appendChild(row)
            for (let j = 0; j < 3; j++)
            {
                let box = document.createElement("div")
                // calculate a delay based on the box index
                let delay = (i * 3 + j) * 300; // 300ms stagger per box
                box.setAttribute("class", "box")
                box.style.animation = 'box'
                box.style.animationDuration = '1s'
                box.style.animationFillMode = "forwards";
                box.style.animationDelay = `${delay}ms`;
                
                row.appendChild(box)
            }
            
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

                        let res = checkWinner(gameBoard)
                        if (res){
                            curPlayer = null
                            displayWinner(res)
                        }
                        else {
                            // Switch turn to computer
                            curPlayer = computerMark;
                            compMove();
                        }
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
                    let score;
                    if (state === "ai_2") {
                        score = minimax(gameBoard, 0, false)
                    }
                    else {
                        score = random_score()
                    }
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
            let res = checkWinner(gameBoard)
            if (res){
                displayWinner(res)
                curPlayer = null
            }
            else {
                curPlayer = mark; // give turn back to human
            }
            displayBoard();
        }
    }

    function random_score() {
        let values = Object.values(scores);
        let randomValue = values[Math.floor(Math.random() * values.length)];
        console.log(randomValue); // could be 10, -10, or 0

        return randomValue
    }

    function minimax(board, depth, isMaximizing) {
        let result = checkWinner(board)
        if (result !== null) {
            return scores[result]
        }
        if (isMaximizing) {
            let bestScore = -Infinity;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++)
                {
                    if (board[i][j] === '') {
                        board[i][j] = computerMark
                        let score = minimax(board, depth + 1, false)
                        board[i][j] = ''
                        bestScore = Math.max(score, bestScore)
                    }
                }
            }
            return bestScore;  
        }
        else {
            let bestScore = Infinity;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++)
                {
                    if (board[i][j] === '') {
                        board[i][j] = humanMark
                        let score = minimax(board, depth + 1, true)
                        board[i][j] = ''
                        bestScore = Math.min(score, bestScore)
                    }
                }
            }
            return bestScore;
        }
    }

    function checkWinner(board) {
        // horizontal check
        for (let i = 0; i < 3; i++) {
            if (board[i][0] !== '' &&
                board[i][0] === board[i][1] && 
                board[i][1] === board[i][2]) {
                return board[i][0]
            }
        }

        // vertical check
        for (let i = 0; i < 3; i++) {
            if (board[0][i] !== '' &&
                board[0][i] === board[1][i] && 
                board[1][i] === board[2][i]) {
                return board[0][i]
            }
        }

        // diagonal check
        if (board[0][0] !== '' &&
            board[0][0] === board[1][1] && 
            board[1][1] === board[2][2]) {
            return board[0][0]
        }
        if (board[2][0] !== '' &&
            board[2][0] === board[1][1] 
            && board[1][1] === board[0][2]) {
            return board[2][0]
        }


        // checks if the board is filled
        let openSpots = 0;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (board[i][j] == '') {
                    openSpots++;
                }
            }
        }

        if (openSpots === 0) {
            return 'tie';
        } else {
            return null;
        }
    }

    const displayWinner = (winner) => {
        let results = document.querySelector('.results');
        let winMsg = document.createElement('h1')
        winMsg.setAttribute("class", "winMsg")
        if (winner === 'tie') {
            winMsg.innerHTML = "It's a tie! ";
        } else {
            winMsg.innerHTML = `${winner} has won! `;
        }
        results.appendChild(winMsg);
    }

    const runGame = () => {
        createBoard();
        humanMove(mark);
        displayBoard();
    };

    return {runGame}

})(mark, state);

const modal = document.querySelector("dialog")

modal.showModal()

Game.runGame()