import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/ButtonTypeGame.css';

const FullRules = () => {
  const navigate = useNavigate();

  return (
    <div className="full-rules-container">
      <h1>Reglas de juegos</h1>
      <div className="buttons-container">
        <button className="game-button-types" onClick={() => navigate('/game9x9')}>
          <img src='/src/assets/img/tictactoe9x9.png' alt="Ultimate TicTacToe" className="game-button-image" />
          <span className="game-button-title">Ultimate Tic Tac Toe</span>
        </button>
        <button className="game-button-types" onClick={() => navigate('/game3d')}>
          <img src='/src/assets/img/tictactoe9x9.png' alt="3D Tic Tac Toe" className="game-button-image" />
          <span className="game-button-title">3D Tic Tac Toe</span>
        </button>
      </div>
    </div>
  );
};

export default FullRules;
