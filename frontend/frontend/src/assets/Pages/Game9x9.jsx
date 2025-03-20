import React, { useState } from 'react';
import Board from '../components/Board';
import GameStatus from '../components/GameStatus';
import '../css/Board.css';

const Game9x9 = () => {
  const [gameState, setGameState] = useState({
    // 9 mini-tableros de 9 casillas
    boards: Array(9).fill(null).map(() => Array(9).fill(null)),
    // Ganadores de cada mini-tablero
    winners: Array(9).fill(null),
    xIsNext: true,
    currentBoard: null,
  });

  // Estado para 1 o 2 jugadores
  const [isSinglePlayer, setIsSinglePlayer] = useState(true);

  const checkWinner = (squares) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6],
    ];
    for (let [a, b, c] of lines) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const handleClick = (boardIndex, squareIndex) => {
    // Si ya hay un ganado en el MiniBoard, no se puede jugar en ese tablero
    if (gameState.winners[boardIndex] || gameState.boards[boardIndex][squareIndex]) return;

    const newBoards = gameState.boards.map((board, idx) =>
      idx === boardIndex
        ? board.map((square, i) => (i === squareIndex ? (gameState.xIsNext ? 'X' : 'O') : square))
        : board
    );

    // Verificar ganador en el MiniBoard
    const newWinners = [...gameState.winners];
    newWinners[boardIndex] = checkWinner(newBoards[boardIndex]);

    // Actualizar el estado
    setGameState({
      ...gameState,
      boards: newBoards,
      winners: newWinners,
      xIsNext: !gameState.xIsNext,
      currentBoard: gameState.winners[squareIndex] ? null : squareIndex,
    });
  };

  // Función para 1 o 2 jugadores
  const togglePlayers = () => {
    setIsSinglePlayer(!isSinglePlayer);
  };

  // Función para resetear
  const resetGame = () => {
    setGameState({
      boards: Array(9).fill(null).map(() => Array(9).fill(null)),
      winners: Array(9).fill(null),
      xIsNext: true,
      currentBoard: null,
    });
  };

  const getGameStatus = () => {
    const globalWinner = checkWinner(gameState.winners);
    if (globalWinner) return `${globalWinner} wins the game!`;
    return `Next player: ${gameState.xIsNext ? 'X' : 'O'}`;
  };

  return (
    <div className="game">
      <div>
        <h3>Ultimate Tic Tac Toe</h3>
      </div>
      <GameStatus 
        status={getGameStatus()} 
        isSinglePlayer={isSinglePlayer} 
        onTogglePlayers={togglePlayers} 
        onReset={resetGame} 
      />
      <Board boards={gameState.boards} winners={gameState.winners} onMove={handleClick} />
    </div>
  );
};

export default Game9x9;
