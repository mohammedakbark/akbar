"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Enhanced 3D Background using Three.js
 * Creates an interactive particle system with floating spheres
 */
export default function EnhancedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      precision: "lowp"
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x0a0a0a, 0.1);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Create particle geometry
    const particleCount = 500;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 100;
      positions[i + 1] = (Math.random() - 0.5) * 100;
      positions[i + 2] = (Math.random() - 0.5) * 100;

      velocities[i] = (Math.random() - 0.5) * 0.5;
      velocities[i + 1] = (Math.random() - 0.5) * 0.5;
      velocities[i + 2] = (Math.random() - 0.5) * 0.5;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    // Create material
    const material = new THREE.PointsMaterial({
      color: 0x6B5B95,
      size: 0.3,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.3,
    });

    // Create points
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);
    particlesRef.current = particles;

    // Add some floating spheres for depth
    const sphereGeometry = new THREE.IcosahedronGeometry(1, 4);
    const sphereMaterial = new THREE.MeshPhongMaterial({
      color: 0x6B5B95,
      emissive: 0x3A2F52,
      wireframe: true,
      opacity: 0.15,
      transparent: true,
    });

    for (let i = 0; i < 5; i++) {
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.position.set(
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 60,
        (Math.random() - 0.5) * 60
      );
      sphere.scale.set(Math.random() * 2 + 1, Math.random() * 2 + 1, Math.random() * 2 + 1);
      scene.add(sphere);
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0x6B5B95, 0.8, 150);
    pointLight.position.set(50, 50, 50);
    scene.add(pointLight);

    // Mouse tracking
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Handle resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Animation loop
    let animationId: number;
    const animate = () => {
      animationId = requestAnimationFrame(animate);

      // Rotate particles
      if (particles) {
        particles.rotation.x += 0.0001;
        particles.rotation.y += 0.0002;
      }

      // Mouse tracking effect
      camera.position.x += (mouseRef.current.x * 10 - camera.position.x) * 0.05;
      camera.position.y += (mouseRef.current.y * 10 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      // Update particles velocity
      const positionAttribute = geometry.getAttribute("position");
      const positions = positionAttribute.array as Float32Array;

      for (let i = 0; i < positions.length; i += 3) {
        positions[i] += velocities[i];
        positions[i + 1] += velocities[i + 1];
        positions[i + 2] += velocities[i + 2];

        // Boundary checking
        if (positions[i] > 50 || positions[i] < -50) velocities[i] *= -1;
        if (positions[i + 1] > 50 || positions[i + 1] < -50) velocities[i + 1] *= -1;
        if (positions[i + 2] > 50 || positions[i + 2] < -50) velocities[i + 2] *= -1;
      }

      positionAttribute.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none -z-10"
      style={{ overflow: "hidden" }}
    />
  );
}
