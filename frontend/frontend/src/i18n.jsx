// src/i18n/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Traducciones
const resources = {
  en: {
    translation: {
    /**Página principal */
    bienvenida: "Do you know tic-tac-toe?!",
    descripcionInicio :"On this page you will find other ways to play tic-tac-toe",
    descripcion3D: "Think in three dimensions. Line up your pieces in a 3x3x3 cube to win. Strategy in all directions!",
    descripcionUltimate: "Win on the big board by dominating the mini-boards. Every move decides the next board!",
    consultaReglas: "Don't know the rules of the game? Consult them",

    /**Botones */
    inicio: "Home",
    reglas: "Rules",
    

    }
  },
  es: {
    translation: {
    /**Página principal */
    bienvenida: "¿Conoces el tres en raya?",
    descripcionInicio :"En esta página encontrarás otras formas de jugar el tres en raya. Selecciona que tipo de juego quieres probar.",
    descripcion3D: "Piensa en tres dimensiones. Alinea tus fichas en un cubo 3x3x3 para ganar. ¡Estrategia en todas las direcciones!",
    descripcionUltimate: "Gana en el tablero grande dominando los mini-tableros. ¡Cada movimiento decide el siguiente tablero!",
    consultaReglas: "¿No conoces las reglas del juego? Consúltalas",

    /**Botones */
    inicio: "Inicio",
    reglas: "Reglas",
      
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'es',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
