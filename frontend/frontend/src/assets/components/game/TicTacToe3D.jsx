// src/assets/components/TicTacToe3D.jsx
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import '../../css/TicTacToe3D.css'; 

const TicTacToe3D = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Escena, cámara y renderizador de Three.js
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Creación del cubo
    const geometry = new THREE.BoxGeometry(3, 3, 3); // Cubo 3x3x3
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Crear las caras del cubo con tableros
    const faces = [
      new THREE.MeshBasicMaterial({ color: 0xff0000, side: THREE.DoubleSide }), // Rojo
      new THREE.MeshBasicMaterial({ color: 0x00ff00, side: THREE.DoubleSide }), // Verde
      new THREE.MeshBasicMaterial({ color: 0x0000ff, side: THREE.DoubleSide }), // Azul
      new THREE.MeshBasicMaterial({ color: 0xffff00, side: THREE.DoubleSide }), // Amarillo
      new THREE.MeshBasicMaterial({ color: 0x00ffff, side: THREE.DoubleSide }), // Cian
      new THREE.MeshBasicMaterial({ color: 0xff00ff, side: THREE.DoubleSide }), // Magenta
    ];

    // Asignamos las texturas a las caras del cubo
    cube.material = new THREE.MeshFaceMaterial(faces);

    // Posición de la cámara
    camera.position.z = 5;

    // Función de animación para hacer que el cubo gire
    const animate = function () {
      requestAnimationFrame(animate);
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;
      renderer.render(scene, camera);
    };

    animate();

    // Limpiar al desmontar el componente
    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div ref={mountRef} className="tictactoe-3d-container"></div>
  );
};

export default TicTacToe3D;
