function create_board() {
    const board = document.querySelector(".board")
    for (let i = 0; i < 9; i++) {
        let box = document.createElement("div")
        box.setAttribute("class", "box")
        board.appendChild(box)
    }
}

create_board()