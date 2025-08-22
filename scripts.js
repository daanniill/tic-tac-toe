const Game = (function() {
    let board = [...Array(3).map(e => Array(3).fill(''))]

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

    const displayControl = () => {
        
    };

    return {board, createBoard}

})();

Game.createBoard()