const Gameboard = (() => {
    let boardArray = [['X','X','X'], ['O', 'O', 'O'], ['X','X','X']]
    const getBoard = () => board;
    const setBoard = (newBoard) => board = newBoard;
    const resetBoard = () => board = [['','',''], ['','',''], ['','','']];
    
    const displayBoard = () => {
        const boardContainer = document.querySelector('.board-container');
        const board = document.createElement('div');
        board.classList.add('board');
        boardContainer.appendChild(board);
        for (let i = 0; i < 9; i++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.setAttribute('id', `square${i}`);
            square.textContent = boardArray[Math.floor(i/3)][i%3];
            board.appendChild(square);
        }
    }

    const updateBoard = () => {
        const squares = document.querySelectorAll('.square');
        squares.forEach((square) => {
            square.textContent = boardArray[Math.floor(i/3)][i%3];
        })
    }

    const checkWin = () => {
        // check rows
        for (let i = 0; i < 3; i++) {
            if (boardArray[i][0] === boardArray[i][1] && boardArray[i][1] === boardArray[i][2]) {
                return boardArray[i][0];
            }
        }
        // check columns
        for (let i = 0; i < 3; i++) {
            if (boardArray[0][i] === boardArray[1][i] && boardArray[1][i] === boardArray[2][i]) {
                return boardArray[0][i];
            }
        }
        // check diagonals
        if (boardArray[0][0] === boardArray[1][1] && boardArray[1][1] === boardArray[2][2]) {
            return boardArray[0][0];
        }
        if (boardArray[0][2] === boardArray[1][1] && boardArray[1][1] === boardArray[2][0]) {
            return boardArray[0][2];
        }
        return false;
    }

    const checkTie = () => {
        for (let i = 0; i < 3; i++) {
            if (boardArray[i].includes('')) {
                return false;
            }
        }
        return true;
    }

    const checkEnd = () => {
        if (checkWin()) {
            return checkWin();
        }
        if (checkTie()) {
            return 'tie';
        }
        return false;
    }

    const playRound = (player, square) => {
        if (boardArray[Math.floor(square/3)][square%3] === '') {
            boardArray[Math.floor(square/3)][square%3] = player.mark;
            updateBoard();
            return checkEnd();
        }
        return false;
    }

    return {displayBoard, playRound}

})();

const player = (name, mark) => {
    return {name, mark}
}

const displayController = (() => {
})();

const gameController = (() => {})();

Gameboard.displayBoard();
