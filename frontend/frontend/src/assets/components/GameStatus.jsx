import React from 'react';
import PlayerOne from '../img/1jugador.png';
import PlayerTwo from '../img/2jugadores.png';
import Reset from '../img/reiniciar.png';
import '../css/GameStatus.css';

const GameStatus = ({ status, isSinglePlayer, onTogglePlayers, onReset, difficulty, onToggleDifficulty }) => {

  const handleToggleDifficulty = () => {
    if( difficulty === 'easy' ){
      window.alert("Puedes jugar pero el modelo IA está en pruebas");
    }
    onToggleDifficulty();
  };


  return (
    <div className="game-status">
      <div className="settings-row">
        <div className="player-selection" onClick={onTogglePlayers}>
          <img
            src={isSinglePlayer ? PlayerOne : PlayerTwo}
            alt={isSinglePlayer ? "1" : "2"}
          />
          <span>{isSinglePlayer ? "1" : "2"}</span>
        </div>

        {isSinglePlayer && (
          <div className="difficulty-selection" onClick={handleToggleDifficulty}>
            <span>{difficulty === 'easy' ? 'Fácil' : 'Difícil'}</span>
          </div>
        )}

        <button className="reset-button" onClick={onReset}>
          <img src={Reset} alt="Reset Game" />
        </button>
      </div>
      <div className="turn-status">{status}</div>
    </div>
  );
};

export default GameStatus;
