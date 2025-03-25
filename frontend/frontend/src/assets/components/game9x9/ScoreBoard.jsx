import React from 'react';
import '../../css/game9x9/ScoreBoard.css';

const ScoreBoard = ({ isSinglePlayer, scoreX, scoreO,  }) => {
  return (
    <div className="score-board">
      <h2 className="score-title">Marcador</h2>
      <div className="score-container">
        <div className="score">
          <span>{isSinglePlayer ? "Jugador" : "Jugador 1"}</span>
          <span>{scoreX}</span>
        </div>
        <span className="vs">VS</span>
        <div className="score">
          <span>{isSinglePlayer ? "Jugador IA" : "Jugador 2"}</span>
          <span>{scoreO}</span>
        </div>
      </div>
    </div>
  );
};

export default ScoreBoard;
