import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import '../../css/TicTacToe3D.css';

const TicTacToe3D = () => {
  const cubeRef = useRef(null);
  const isDragging = useRef(false);
  const prevMousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const geometry = new THREE.BoxGeometry();

    const edges = new THREE.EdgesGeometry(geometry);

    // Crear materiales para las aristas
    const materials = [
      new THREE.LineBasicMaterial({ color: 0xff0000 }), // Rojo
      new THREE.LineBasicMaterial({ color: 0x00ff00 }), // Verde
      new THREE.LineBasicMaterial({ color: 0x0000ff }), // Azul
      new THREE.LineBasicMaterial({ color: 0xffff00 }), // Amarillo
      new THREE.LineBasicMaterial({ color: 0xff00ff }), // Magenta
      new THREE.LineBasicMaterial({ color: 0x00ffff }), // Cian
    ];

    const lines = [];
    let materialIndex = 0;

    for (let i = 0; i < edges.attributes.position.count; i += 2) {
      const geometrySegment = new THREE.BufferGeometry().setFromPoints([
        new THREE.Vector3().fromBufferAttribute(edges.attributes.position, i),
        new THREE.Vector3().fromBufferAttribute(edges.attributes.position, i + 1),
      ]);

      const material = materials[materialIndex];
      const line = new THREE.Line(geometrySegment, material);
      lines.push(line);
      scene.add(line);

      materialIndex = (materialIndex + 1) % materials.length;
    }

    camera.position.z = 5;

    const animate = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    window.addEventListener('resize', () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
    });

    const onMouseDown = (event) => {
      isDragging.current = true;
      prevMousePos.current = { x: event.clientX, y: event.clientY };
    };

    // Función para mover el cubo mientras se arrastra el ratón
    const onMouseMove = (event) => {
      if (!isDragging.current) return;

      const deltaX = event.clientX - prevMousePos.current.x;
      const deltaY = event.clientY - prevMousePos.current.y;

      lines.forEach(line => {
        line.rotation.x += deltaY * 0.01;
        line.rotation.y += deltaX * 0.01;
      });

      prevMousePos.current = { x: event.clientX, y: event.clientY };
    };

    const onMouseUp = () => {
      isDragging.current = false;
    };

    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    return () => {
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
