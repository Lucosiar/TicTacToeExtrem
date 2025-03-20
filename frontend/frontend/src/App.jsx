import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import ButtonTypeGame from './assets/components/ButtonTypeGame.jsx';
import './App.css';
import TicTacToe3D from './assets/components/TicTacToe3D.jsx';
import Game9x9 from './assets/Pages/Game9x9.jsx';

const GameSelection = () => {
  const navigate = useNavigate();

  const handleGameSelection = async (gameType) => {
    if (gameType === "game1") {
      navigate("/game1");
    } else if (gameType === "game2") {
      navigate("/game9x9");
    }
  };

  return (
    <div>
      <h1>Diferent Tic Tac Toe</h1>
      <h2>Select what type of game you want to play</h2>
      <div className="game-selection">
        <ButtonTypeGame
          imageSrc="./src/assets/img/prueba.jpeg"
          title="3D"
          onClick={() => handleGameSelection("game1")}
        />
        <ButtonTypeGame
          imageSrc="./src/assets/img/prueba.jpeg"
          title="Ultimate"
          onClick={() => handleGameSelection("game2")}
        />
      </div>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GameSelection />} />
        <Route path="/game1" element={<TicTacToe3D />} />
        <Route path="/game9x9" element={<Game9x9 />} />
      </Routes>
      <footer className='footer'>
        &copy; 2025 Lucosiar&reg;
      </footer>
    </BrowserRouter>
    
  );
};

export default App;
