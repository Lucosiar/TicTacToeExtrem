import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import '../../css/TicTacToe3D.css';

const TicTacToe3D = () => {
  const isDragging = useRef(false);
  const prevMousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // Crear los materiales para las aristas del cubo
    const materials = [
      new THREE.LineBasicMaterial({ color: 0xff0000 }), // Rojo
      new THREE.LineBasicMaterial({ color: 0x00ff00 }), // Verde
      new THREE.LineBasicMaterial({ color: 0x0000ff }), // Azul
      new THREE.LineBasicMaterial({ color: 0xffff00 }), // Amarillo
      new THREE.LineBasicMaterial({ color: 0xff00ff }), // Magenta
      new THREE.LineBasicMaterial({ color: 0x00ffff }), // Cian
    ];

    // Crear las aristas del cubo de Rubik (3x3)
    const createEdge = (x1, y1, z1, x2, y2, z2, material) => {
      const geometry = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3(x1, y1, z1),
        new THREE.Vector3(x2, y2, z2),
      ]);
      return new THREE.Line(geometry, material);
    };

    // Función para crear un cubo de Rubik 3x3 solo con aristas
    const createRubikCube = () => {
      const lines = [];
      const offset = 1; // Tamaño de cada subcubo

      // Crear aristas para cada subcubo del cubo de Rubik
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          for (let z = -1; z <= 1; z++) {
            // Crear aristas para cada subcubo
            lines.push(createEdge(x * offset, y * offset, z * offset, (x + 1) * offset, y * offset, z * offset, materials[0])); // Frente
            lines.push(createEdge((x + 1) * offset, y * offset, z * offset, (x + 1) * offset, (y + 1) * offset, z * offset, materials[0])); // Frente
            lines.push(createEdge((x + 1) * offset, (y + 1) * offset, z * offset, x * offset, (y + 1) * offset, z * offset, materials[0])); // Frente
            lines.push(createEdge(x * offset, (y + 1) * offset, z * offset, x * offset, y * offset, z * offset, materials[0])); // Frente

            lines.push(createEdge(x * offset, y * offset, (z + 1) * offset, (x + 1) * offset, y * offset, (z + 1) * offset, materials[1])); // Atrás
            lines.push(createEdge((x + 1) * offset, y * offset, (z + 1) * offset, (x + 1) * offset, (y + 1) * offset, (z + 1) * offset, materials[1])); // Atrás
            lines.push(createEdge((x + 1) * offset, (y + 1) * offset, (z + 1) * offset, x * offset, (y + 1) * offset, (z + 1) * offset, materials[1])); // Atrás
            lines.push(createEdge(x * offset, (y + 1) * offset, (z + 1) * offset, x * offset, y * offset, (z + 1) * offset, materials[1])); // Atrás

            lines.push(createEdge(x * offset, y * offset, z * offset, x * offset, y * offset, (z + 1) * offset, materials[2])); // Izquierda
            lines.push(createEdge((x + 1) * offset, y * offset, z * offset, (x + 1) * offset, y * offset, (z + 1) * offset, materials[3])); // Derecha
            lines.push(createEdge((x + 1) * offset, (y + 1) * offset, z * offset, (x + 1) * offset, (y + 1) * offset, (z + 1) * offset, materials[4])); // Derecha
            lines.push(createEdge(x * offset, (y + 1) * offset, z * offset, x * offset, (y + 1) * offset, (z + 1) * offset, materials[5])); // Izquierda
          }
        }
      }

      return lines;
    };

    // Crear el cubo de Rubik solo con aristas
    const cubeLines = createRubikCube();

    // Añadir las líneas al cubo
    cubeLines.forEach(line => {
      scene.add(line);
    });

    // Posicionar la cámara
    camera.position.z = 6;

    // Función de animación vacía (sin movimiento automático)
    const animate = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    // Ajustar el tamaño del renderizado cuando cambie el tamaño de la ventana
    window.addEventListener('resize', () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    });

    // Función para iniciar el movimiento
    const onMouseDown = (event) => {
      isDragging.current = true;
      prevMousePos.current = { x: event.clientX, y: event.clientY };
    };

    // Función para mover el cubo mientras se arrastra el ratón
    const onMouseMove = (event) => {
      if (!isDragging.current) return;

      const deltaX = event.clientX - prevMousePos.current.x;
      const deltaY = event.clientY - prevMousePos.current.y;

      // Actualizar la posición de las rotaciones del cubo
      cubeLines.forEach(line => {
        line.rotation.x += deltaY * 0.01; // Movimiento vertical
        line.rotation.y += deltaX * 0.01; // Movimiento horizontal
      });

      prevMousePos.current = { x: event.clientX, y: event.clientY };
    };

    // Finalizar el movimiento
    const onMouseUp = () => {
      isDragging.current = false;
    };

    // Agregar eventos para arrastrar
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
      // Limpiar el renderer y el canvas
      window.removeEventListener('resize', () => {});
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      document.body.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return null;
};

export default TicTacToe3D;
