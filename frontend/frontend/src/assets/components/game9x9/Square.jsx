import React from 'react';
import '../../css/game9x9/Board.css';

const Square = ({ value, onClick, onMouseEnter, onMouseLeave, hovered }) => {
  return (
    <button
      className={`square ${hovered ? 'hovered' : ''}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {value || (hovered ? '◉' : '')}
    </button>
  );
};

export default Square;
