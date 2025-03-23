import Square from "./Square";
import React from 'react';
import '../css/Board.css';

const MiniBoard = ({ squares, onSquareClick, winner, isActive, handleMouseEnter, handleMouseLeave }) => {
  return (
    <div className={`mini-board ${winner ? 'won' : ''} ${isActive ? 'active' : 'disabled'}`}>
        {winner && <div className="overlay">{winner}</div>}
      {[0, 1, 2].map((row) => (
        <div className="board-row" key={row}>
          {[0, 1, 2].map((col) => {
            const index = row * 3 + col;
            return (
              <Square 
                key={index} 
                value={squares[index]}
                onClick={isActive ? () => onSquareClick(index) : null}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave} />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default MiniBoard;
