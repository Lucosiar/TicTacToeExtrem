import React, { useState  } from 'react';
import MiniBoard from './MiniBoard';
import '../../css/game9x9/Board.css';

const Board = ({ boards, winners, onMove, currentBoard, isSinglePlayer  }) => {

  const [hoveredSquare, setHoveredSquare] = useState(null);

  const handleMouseEnter = (boardIndex, squareIndex) => {
    if (currentBoard !== null && currentBoard !== boardIndex) {
      return;
    }

    if (!boards[boardIndex][squareIndex]) {
      setHoveredSquare({ boardIndex, squareIndex });
    }
  };

  const handleMouseLeave = () => {
    setHoveredSquare(null);
  };

  const isSquareDisabled = (boardIndex, squareIndex) => {
    return isSinglePlayer || winners[boardIndex] || boards[boardIndex][squareIndex];
  };

  return (
    <div className="board">
      {[0, 1, 2].map((row) => (
        <div className="board-row" key={row}>
          {[0, 1, 2].map((col) => {
            const boardIndex = row * 3 + col;
            return (
              <MiniBoard
                key={boardIndex}
                squares={boards[boardIndex]}
                onSquareClick={(squareIndex) => onMove(boardIndex, squareIndex)}
                winner={winners[boardIndex]}
                isActive={currentBoard === null || currentBoard === boardIndex}
                handleMouseEnter={handleMouseEnter}
                handleMouseLeave={handleMouseLeave}
                //disabled={isSquareDisabled(boardIndex, col)}
              />
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default Board;
