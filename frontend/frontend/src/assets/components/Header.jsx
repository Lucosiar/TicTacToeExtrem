import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Header.css';

const Header = () => {
  return (
    <header className="header">
        <nav>
            <ul>
                <li className='logo_nombre'>
                    <a href="https://lucosiar.pythonanywhere.com/" target="_blank" rel="noopener noreferrer">
                    <img rel="icon" src="/src/assets/img/serpienteMorada.ico" alt="Lucosiar Logo" className='logo' />
                    </a>
                </li>
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/game9x9">Ultimate Tic Tac Toe</Link></li>
                <li><Link to="/game1">3D Tic Tac Toe</Link></li>
                {/* Para las normas tendré que crear una página que rediriga a las normas de varios juegos: https://tictactoefree.com/es/todas-las-reglas*/}
                <li><Link to="/rules9x9">Reglas</Link></li>
            </ul>
        </nav>
    </header>
  );
};

export default Header;
