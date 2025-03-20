import React from 'react';
import '../css/ButtonTypeGame.css';


const ButtonTypeGame = ({ imageSrc, title, onClick }) => {
  return (
    <button className="game-button" onClick={onClick}>
      <img src={imageSrc} alt={title} className="game-button-image" />
      <span className="game-button-title">{title}</span>
    </button>
  );
};

export default ButtonTypeGame;
