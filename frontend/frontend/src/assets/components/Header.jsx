import React from 'react';
import { Link } from 'react-router-dom';
import SwitchComponent from './SwitchComponent.jsx';
import '../css/Header.css';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { t, i18n } = useTranslation();

  return (
    <header className="header">
        <nav>
            <ul>
                <li className='logo_nombre'>
                    <a href="https://lucosiar.es/" target="_blank" rel="noopener noreferrer">
                    <img rel="icon" src="/img/serpienteMorada.ico" alt="Lucosiar Logo" className='logo' />
                    </a>
                </li>
                <li><Link to="/">{t("inicio")}</Link></li>
                <li><Link to="/game9x9">Ultimate Tic Tac Toe</Link></li>
                <li><Link to="/game1">3D Tic Tac Toe</Link></li>
                {/* Para las normas tendré que crear una página que rediriga a las normas de varios juegos: https://tictactoefree.com/es/todas-las-reglas*/}
                <li><Link to="/fullrules">{t("reglas")}</Link></li>
                <li><SwitchComponent /></li>
            </ul>
        </nav>
    </header>
  );
};

export default Header;
