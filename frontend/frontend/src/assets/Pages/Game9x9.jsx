import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import Board from '../components/Board';
import GameStatus from '../components/GameStatus';
import ScoreBoard from '../components/ScoreBoard';
import '../css/Board.css';

const Game9x9 = () => {
  const [gameState, setGameState] = useState({
    // 9 mini-tableros de 9 casillas
    boards: Array(9).fill(null).map(() => Array(9).fill(null)),
    // Ganadores de cada mini-tablero
    winners: Array(9).fill(null),
    xIsNext: true,
    currentBoard: null,
    isSinglePlayer: false,
    score: {X: 0 , O: 0},
  });

  const [isSinglePlayer, setIsSinglePlayer] = useState(true);
  const [winnerMessage, setWinnerMessage] = useState(null);

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
    setGameState((prevState) => {
      if (prevState.winners[boardIndex] || prevState.boards[boardIndex][squareIndex]) return prevState;

      if(checkWinner(prevState.winners)) return prevState;
  
      const newBoards = prevState.boards.map((board, idx) =>
        idx === boardIndex
          ? board.map((square, i) => (i === squareIndex ? (prevState.xIsNext ? 'X' : 'O') : square))
          : board
      );
  
      const newWinners = [...prevState.winners];
      const winner = checkWinner(newBoards[boardIndex]);
  
      const newScore = { ...prevState.score };
  
      if (winner && !prevState.winners[boardIndex]) {
        newWinners[boardIndex] = winner;
        newScore[winner] += 1;
      }

      // Verificar ganador global
      const globalWinner = checkWinner(newWinners);
      if (globalWinner) {
        setWinnerMessage(isSinglePlayer 
          ? (globalWinner === 'X' ? "¡Victoria!" : "Derrota") 
          : `¡Ganador: ${globalWinner === 'X' ? 'Jugador 1' : 'Jugador 2'}!`);
      } else {
        // Verificar si todos los mini-tableros están llenos y no hay ganador global
        const allBoardsFilled = newWinners.every((winner, index) => {
          // Verificar si cada mini-tablero está lleno (no tiene casillas vacías) o ya tiene un ganador
          return winner !== null || !newBoards[index].includes(null);
        });

        if (allBoardsFilled) {
          setWinnerMessage("¡Empate!");
        }
      }
    
      return {
        ...prevState,
        boards: newBoards,
        winners: newWinners,
        xIsNext: !prevState.xIsNext,
        currentBoard: winner ? null : squareIndex,
        score: newScore,
      };
    });
  };

  // Función IA move
  const aiMove = async () => {
    try{
      const response = await axios.post('http://localhost:8000/game9x9/ai_move/', gameState);
      const aiMove = response.data;
      if (aiMove.boardIndex !== undefined && aiMove.squareIndex !== undefined) {
        handleClick(aiMove.boardIndex, aiMove.squareIndex);
      }
    } catch (error) {
      console.log('Error al obtener el movimiento de la IA: ', error);
    }
  };

  useEffect(() => {
    if (isSinglePlayer && !gameState.xIsNext) {
      aiMove();
    }
  }, [gameState, isSinglePlayer]);
  
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
      score: {X: 0 , O: 0},
    });
    setWinnerMessage(null);
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
      <ScoreBoard
        isSinglePlayer={isSinglePlayer}
        scoreX = {gameState.score.X}
        scoreO = {gameState.score.O}
      />
      {winnerMessage && (
        <div className="popup">
          <div className="popup-content">
            <h2>{winnerMessage}</h2>
            <button onClick={resetGame}>Reiniciar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Game9x9;
