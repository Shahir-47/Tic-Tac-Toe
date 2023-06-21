const Gameboard = (() => {
    let boardArray = [['X','X','X'], ['O', 'O', 'O'], ['X','X','X']]
    const getBoard = () => board;
    const setBoard = (newBoard) => board = newBoard;
    const resetBoard = () => board = [['','',''], ['','',''], ['','','']];
    const displayBoard = () => {
        const container = document.querySelector('.container');
        const board = document.createElement('div');
        board.classList.add('board');
        container.appendChild(board);
        for (let i = 0; i < 9; i++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.setAttribute('id', `square${i}`);
            square.textContent = boardArray[Math.floor(i/3)][i%3];
            board.appendChild(square);
        }
    }
    return {getBoard, setBoard, resetBoard, displayBoard}
})();

const player = (name, mark) => {
    return {name, mark}
}

const displayController = (() => {
})();

const gameController = (() => {})();

Gameboard.displayBoard();
