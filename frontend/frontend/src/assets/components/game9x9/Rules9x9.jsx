import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../css/game9x9/Rules9x9.css';
import ButtonTypeGame from '../ButtonTypeGame.jsx';

const Rules9x9 = () => {
  const navigate = useNavigate();

  return (
    <div className="rules-container">
      <h1>Reglas del Ultimate Tic-Tac-Toe</h1>
      <p>El Ultimate Tic-Tac-Toe es una variación estratégica del juego clásico de Tres en Raya que introduce una capa adicional de complejidad y toma de decisiones. Se compone de una estructura de 9 minitableros, cada uno de los cuales puede ser ganado, perdido o empatado. Las reglas son básicamente las mismas que en el juego tradicional, pero añadiendo una capa adicional de complejidad y toma de decisiones.
      </p>
      <ul>
        <li>1. El primer jugador elige una casilla en cualquier mini-tablero.</li>
        <li>2. El siguiente jugador debe jugar en el mini-tablero correspondiente a la casilla seleccionada por el oponente.</li>
        <li>3. Para ganar un mini-tablero, hay que hacer un 3 en raya dentro de él.</li>
        <li>4. El primer jugador en ganar 3 mini-tableros en línea, gana la partida.</li>
        <li>5. Si el mini-tablero asignado ya está ganado o empatado, el jugador puede elegir cualquier casilla disponible.</li>
      </ul>
      <p>¡A que esperas para probar a jugar!</p>
      <ButtonTypeGame
          imageSrc="./src/assets/img/prueba.jpeg"
          title="Ultimate"
          onClick={() => handleGameSelection("game2")}
        />
      <p>¡Espero que disfrutes jugando!</p>
    </div>
  );
};

export default Rules9x9;
