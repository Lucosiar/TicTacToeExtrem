import React from 'react';
import '../css/ButtonTypeGame.css';

const ButtonTypeGame = ({ imageSrc, title, description, onClick }) => {
  return (
    <button className="game-button" onClick={onClick}>
      <img src={imageSrc} alt={title} className="game-button-image" />
      <div className="game-button-text">
        <span className="game-button-title">{title}</span>
        <p className="game-button-description">{description}</p>
      </div>
    </button>
  );
};

export default ButtonTypeGame;