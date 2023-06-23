const Gameboard = (() => {
    let boardArray = [['','',''], ['', '', ''], ['','','']]
    const getBoard = () => boardArray;
    const setBoard = (newBoard) => boardArray = newBoard;
    const resetBoard = () => boardArray = [['','',''], ['','',''], ['','','']];
    
    // Display the board
    const displayBoard = () => {
        const boardContainer = document.querySelector('.board-container');
        const board = document.createElement('div');
        board.classList.add('board');
        boardContainer.appendChild(board);
        for (let i = 0; i < 9; i++) {
            const square = document.createElement('div');
            square.classList.add('square');
            square.setAttribute('id', `square${i}`);
            square.textContent = Gameboard.getBoard()[Math.floor(i/3)][i%3];
            board.appendChild(square);
        }
    }

    // Update the board
    const updateBoard = (player1, player2) => {
        const squares = document.querySelectorAll('.square');
        squares.forEach((square, i) => {            
            square.textContent = Gameboard.getBoard()[Math.floor(i/3)][i%3];
            if (square.textContent === player1.mark) {
                square.style.color = player1.color;
            }
            if (square.textContent === player2.mark) {
                square.style.color = player2.color;
            }
        })
    }

    // Design the winning squares
    const designSquare = (square) => {
        square.style.backgroundColor = '#dddcdcbc';
        square.style.border = '2px dashed red';
        square.style.fontWeight = 'bold';
        square.style.fontSize = '5rem';
    }

    // Show the winning design
    const showWin = () => {
        let square;
        if (checkWin().row !== undefined) {
            for (let i = 0; i < 3; i++) {
                square = document.getElementById(`square${checkWin().row * 3 + i}`);
                designSquare(square);
            }
        } else if (checkWin().column !== undefined) {
            for (let i = 0; i < 3; i++) {
                square = document.getElementById(`square${i * 3 + checkWin().column}`);
                designSquare(square);
            }
        } else if (checkWin().diagonal !== undefined) {
            if (checkWin().diagonal === 0) {
                for (let i = 0; i < 3; i++) {
                    square = document.getElementById(`square${i * 3 + i}`);
                    designSquare(square);
                }
            } else {
                for (let i = 0; i < 3; i++) {
                    square = document.getElementById(`square${i * 3 + 2 - i}`);
                    designSquare(square);
                }
            }
        }

    }

    // Remove the winning design
    const removeWin = () => {
        const squares = document.querySelectorAll('.square');
        squares.forEach((square) => {
            square.style.cssText = `
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                transition: all 0.2s ease-in-out;
                border-bottom: 3px dashed #000000;
                border-right: 3px dashed #000000;
                `;
            })
        const rowBorder = document.querySelectorAll('.square:nth-child(3n)');
        rowBorder.forEach((border) => {
            border.style.borderRight = 'none';
        });

        const columnBorder = document.querySelectorAll('.square:nth-child(n+7)');
        columnBorder.forEach((border) => {
            border.style.borderBottom = 'none';
        });
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
    
    // Check if game is over
    const checkEnd = () => {
        if (checkWin().marker) {
            return checkWin().marker;
        }
        if (checkTie()) {
            return 'tie';
        }
        return false;
    }
    
    // Play round
    const playRound = (player, square) => {
        if (boardArray[Math.floor(square/3)][square%3] === '') {
            boardArray[Math.floor(square/3)][square%3] = player.mark;
            updateBoard(gameController.player1, gameController.player2);
            return checkEnd();
        }
        return false;
    }

    return {displayBoard, playRound, showWin, resetBoard, updateBoard, getBoard, removeWin}

})();

const player = (name, mark, color, type) => {
    return {name, mark, color, type}
}

const displayController = (() => {
    let player1_mark = 'X';
    let player2_mark = 'O';

    const player_one_marker_x = document.querySelector('.player-1-choice-x');
    const player_one_marker_o = document.querySelector('.player-1-choice-o');

    const player_two_marker_x = document.querySelector('.player-2-choice-x');
    const player_two_marker_o = document.querySelector('.player-2-choice-o');

    let player_one_color = document.querySelector('.player-1-color');
    let player_two_color = document.querySelector('.player-2-color');

    // Gameboard.displayBoard();

    const player_one_default = () => {
        player_one_color.value = '#eb3434';
        updateMarkerStyle(player_one_marker_x, player_one_color.value);
    }

    const player_two_default = () => {
        player_two_color.value = '#55eb34';
        updateMarkerStyle(player_two_marker_o, player_two_color.value);
    }

    //event listeners for player choices
    const player_event = (player_one_marker_x, player_one_color, player_one_marker_o, player_two_marker_o, player_two_color, player_two_marker_x  ) => {
        player_one_marker_x.addEventListener('click', () => {
            player1_mark = 'X';
            updateMarkerStyle(player_one_marker_x, player_one_color.value);
            uncheck(player_one_marker_o);

            player2_mark = 'O';
            updateMarkerStyle(player_two_marker_o, player_two_color.value);
            uncheck(player_two_marker_x);
        });
        player_one_marker_o.addEventListener('click', () => {
            player1_mark = 'O';
            updateMarkerStyle(player_one_marker_o, player_one_color.value);
            uncheck(player_one_marker_x);

            player2_mark = 'X';
            updateMarkerStyle(player_two_marker_x, player_two_color.value);
            uncheck(player_two_marker_o);
        });
        player_one_color.addEventListener('input', () => {
            if (player_one_marker_o.style.backgroundColor !== ''){
                updateMarkerStyle(player_one_marker_o, player_one_color.value);
            } else{
                updateMarkerStyle(player_one_marker_x, player_one_color.value);
            }
        });
    }

    //update marker style
    const updateMarkerStyle = (marker, color) => {
        marker.style.color = color;
        marker.style.backgroundColor = '#dddcdcbc';
        marker.style.border = `2px dashed ${color}`;
    }

    //uncheck the other marker
    const uncheck = (marker) => {
        marker.style.backgroundColor = '';
        marker.style.border = 'none';
        marker.style.color = 'black';
    }

    const input = () => {
        //default values
        player_one_default();
        player_two_default();

        //event listeners for player choices
        player_event(player_one_marker_x, player_one_color, player_one_marker_o, player_two_marker_o, player_two_color, player_two_marker_x);
        player_event(player_two_marker_x, player_two_color, player_two_marker_o, player_one_marker_o, player_one_color, player_one_marker_x);
    }
    
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
    return {displayWinner, input, player1_mark, player2_mark}
})();


const gameController = (() => {

    //Input
    displayController.input();
    //Display Board
    Gameboard.displayBoard();

    //Default players
    const player1 = player('Player 1', 'X', '#eb3434', 'human');
    const player2 = player('Player 2', 'O', '#55eb34', 'ai');
    
    //Start game
    const startBtn = document.querySelector('.start');
    startBtn.onclick = () => {

        //make the board appear
        const boardContainer = document.querySelector('.board-container');
        boardContainer.style.display = 'block';

        //hide the start screen
        const startScreen = document.querySelector('.load-up');
        startScreen.style.display = 'none';

        //update player names, markers and colors
        player1.name = document.querySelector('.player-1-name').value !== '' ? document.querySelector('.player-1-name').value : player1.name;
        player2.name = document.querySelector('.player-2-name').value !== '' ? document.querySelector('.player-2-name').value : player2.name;
        player1.color = document.querySelector('.player-1-color').value;
        player2.color = document.querySelector('.player-2-color').value;
        player1.mark = document.querySelector('.player-1-choice-x').style.backgroundColor !== '' ? 'X' : 'O';
        player2.mark = document.querySelector('.player-2-choice-x').style.backgroundColor !== '' ? 'X' : 'O';
        player1.type = 'human';
        player2.type = 'ai';

        humanMove();

    }

    //game Flow
    let currentPlayer = player1;
    let result = null;
    let gameOver = false;

    const switchTurns = () => {
        // Switch players
        if (currentPlayer === player1) {
          currentPlayer = player2;
        } else {
          currentPlayer = player1;
        }
        
        if (!gameOver) {
            if (currentPlayer.type === 'ai') {
              aiMove();
            } else if (currentPlayer.type === 'human') {
              humanMove();
            }
        }
    };

    const aiMove = () => {
        const squares = document.querySelectorAll('.square');
        let square;
        do {
          square = Math.floor(Math.random() * 9);
        } while (squares[square].textContent !== '');
        result = Gameboard.playRound(currentPlayer, square);
        if (result) {
          gameOver = true;
          displayController.displayWinner(currentPlayer, result);
          handleGameEnd();
        } else {
          switchTurns();
        }
    };

    const humanMove = () => {
        const squares = document.querySelectorAll('.square');
        squares.forEach((square) => {
          square.onclick = (e) => {
            // Play round if game not over
            if (!gameOver) {
              result = Gameboard.playRound(currentPlayer, e.target.id.slice(-1));
              if (result) {
                gameOver = true;
                displayController.displayWinner(currentPlayer, result);
                handleGameEnd();
              } else {
                switchTurns();
              }
            }
          };
        });
    };

    const handleGameEnd = () => {
        // Make reset button appear
        const container = document.querySelector('.container');
        container.style.gridTemplateRows = 'repeat(3, min-content) 1fr min-content';
        const reset = document.querySelector('.reset-container');
        reset.style.display = 'flex';
    
        // Reset Game
        reset.onclick = () => {
          // Reset the board
          Gameboard.resetBoard();
          Gameboard.updateBoard(player1, player2);
          Gameboard.removeWin();
    
          // Reset the result display
          const winnerDisplay = document.querySelector('.result');
          winnerDisplay.textContent = '';
          winnerDisplay.style.color = 'black';
    
          // Make reset button disappear
          const container = document.querySelector('.container');
          container.style.gridTemplateRows = 'repeat(2, min-content) 1fr min-content';
          const reset = document.querySelector('.reset-container');
          reset.style.display = 'none';
    
          // Reset the game
          gameOver = false;
    
          // Start the game by allowing the first player to make a move
          humanMove();
        };
      };
    return {player1, player2}
})();
  
