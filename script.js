const Gameboard = (() => {
    let boardArray = [['','',''], ['', '', ''], ['','','']]
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

    const updateBoard = (player1, player2) => {
        const squares = document.querySelectorAll('.square');
        squares.forEach((square, i) => {            
            square.textContent = boardArray[Math.floor(i/3)][i%3];
            if (square.textContent === player1.mark) {
                square.style.color = player1.color;
            }
            if (square.textContent === player2.mark) {
                square.style.color = player2.color;
            }
        })
    }
        
    const showWin = () => {
        let square;
        if (checkWin().row !== undefined) {
            for (let i = 0; i < 3; i++) {
                square = document.getElementById(`square${checkWin().row * 3 + i}`);
                square.classList.add('win');
                square.style.border = '2px dashed red';
                square.style.fontWeight = 'bold';
                square.style.fontSize = '5rem';
            }
        } else if (checkWin().column !== undefined) {
            for (let i = 0; i < 3; i++) {
                square = document.getElementById(`square${i * 3 + checkWin().column}`);
                square.classList.add('win');
                square.style.border = '2px dashed red';
                square.style.fontWeight = 'bold';
                square.style.fontSize = '5rem';
            }
        } else if (checkWin().diagonal !== undefined) {
            if (checkWin().diagonal === 0) {
                for (let i = 0; i < 3; i++) {
                    square = document.getElementById(`square${i * 3 + i}`);
                    square.classList.add('win');
                    square.style.border = '2px dashed red';
                    square.style.fontWeight = 'bold';
                    square.style.fontSize = '5rem';
                }
            } else {
                for (let i = 0; i < 3; i++) {
                    square = document.getElementById(`square${i * 3 + 2 - i}`);
                    square.classList.add('win');
                    square.style.border = '2px dashed red';
                    square.style.fontWeight = 'bold';
                    square.style.fontSize = '5rem';
                }
            }
        }

    }
    

    const checkWin = () => {
        // check rows
        for (let i = 0; i < 3; i++) {
            if (boardArray[i][0] === boardArray[i][1] && boardArray[i][1] === boardArray[i][2] && boardArray[i][0] !== '') {
                return {marker: boardArray[i][0], row: i};
            }
        }
        // check columns
        for (let i = 0; i < 3; i++) {
            if (boardArray[0][i] === boardArray[1][i] && boardArray[1][i] === boardArray[2][i] && boardArray[0][i] !== '') {
                return {marker: boardArray[0][i], column: i};
            }
        }
        // check diagonals
        if (boardArray[0][0] === boardArray[1][1] && boardArray[1][1] === boardArray[2][2] && boardArray[0][0] !== '') {
            return {marker: boardArray[0][0], diagonal: 0};
        }
        if (boardArray[0][2] === boardArray[1][1] && boardArray[1][1] === boardArray[2][0] && boardArray[0][2] !== '') {
            return {marker: boardArray[0][2], diagonal: 1};
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
        if (checkWin().marker) {
            return checkWin().marker;
        }
        if (checkTie()) {
            return 'tie';
        }
        return false;
    }

    const playRound = (player, square) => {
        if (boardArray[Math.floor(square/3)][square%3] === '') {
            boardArray[Math.floor(square/3)][square%3] = player.mark;
            updateBoard(gameController.player1, gameController.player2);
            return checkEnd();
        }
        return false;
    }

    return {displayBoard, playRound, showWin}

})();

const player = (name, mark, color) => {
    return {name, mark, color}
}

const displayController = (() => {
    Gameboard.displayBoard();

    const displayWinner = (winner, result) => {
        const winnerDisplay = document.querySelector('.result');
        if (result === 'tie') {
            winnerDisplay.textContent = 'It\'s a tie!';
        } else {
            winnerDisplay.style.color = winner.color;

            winnerDisplay.textContent = `${winner.name} wins!`;
            Gameboard.showWin();
        }
    }
    return {displayWinner}
})();


const gameController = (() => {
    const player1 = player('Player 1', 'X', 'blue');
    const player2 = player('Player 2', 'O', 'red');
    let currentPlayer = player1;
    let result = null;
    let gameOver = false;
  
    const squares = document.querySelectorAll('.square');
    squares.forEach((square) => {
      square.addEventListener('click', (e) => {
        if (!gameOver) {
          result = Gameboard.playRound(currentPlayer, e.target.id.slice(-1));
          if (result) {
            gameOver = true;
            displayController.displayWinner(currentPlayer, result);
          }
          if (currentPlayer === player1) {
            currentPlayer = player2;
          } else {
            currentPlayer = player1;
          }
        }
      });
    });
    return {result, player1, player2}
})();
  
