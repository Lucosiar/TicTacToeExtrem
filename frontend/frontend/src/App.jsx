import React from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import ButtonTypeGame from './assets/components/ButtonTypeGame.jsx';
import './App.css';
import Game3D from './assets/Pages/Game3D.jsx';
import Game9x9 from './assets/Pages/Game9x9.jsx';
import Rules9x9 from './assets/components/game9x9/Rules9x9.jsx';
import Header from './assets/components/Header.jsx';
import FullRules from './assets/components/FullRules.jsx';
import { useTranslation } from 'react-i18next';

const GameSelection = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
  };

  const navigate = useNavigate();

  const handleGameSelection = async (gameType) => {
    if (gameType === "game1") {
      navigate("/game3d");
    } else if (gameType === "game2") {
      navigate("/game9x9");
    }
  };

  return (
    <div>
      <p className='title'>{t("bienvenida")}</p>
      <p className='subtitle'>{t("descripcionInicio")}</p>
      <div className="game-selection">
        <ButtonTypeGame
          imageSrc="/img/3dtictactoe.png"
          title="3D TicTacToe"
          description={t("descripcion3D")}
          onClick={() => handleGameSelection("game1")}
        />
        <ButtonTypeGame
          imageSrc="/img/tictactoe9x9.png"
          title="Ultimate TicTacToe"
          description={t("descripcionUltimate")}
          onClick={() => handleGameSelection("game2")}
        />
        <p>
        {t("consultaReglas")}
        </p>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<GameSelection />} />
        <Route path="/game3d" element={<Game3D />} />
        <Route path="/game9x9" element={<Game9x9 />} />
        <Route path='/rules9x9' element={<Rules9x9 />} />
        <Route path='/fullrules' element={<FullRules />} />
      </Routes>
      <footer className='footer'>
        &copy; 2025 Lucosiar
      </footer>
    </BrowserRouter>
    
  );
};

export default App;
