"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { prefersReducedMotion } from "@/lib/scroll";

/**
 * Enhanced 3D Background using Three.js
 * - Soft particle field with a few wireframe spheres, gently following the mouse
 * - Fades out as the hero scrolls away and stops rendering when invisible
 */
export default function EnhancedBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || prefersReducedMotion()) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, precision: "lowp" });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Particles
    const particleCount = window.innerWidth < 768 ? 140 : 260;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 100;
      positions[i + 1] = (Math.random() - 0.5) * 100;
      positions[i + 2] = (Math.random() - 0.5) * 100;

      velocities[i] = (Math.random() - 0.5) * 0.04;
      velocities[i + 1] = (Math.random() - 0.5) * 0.04;
      velocities[i + 2] = (Math.random() - 0.5) * 0.04;
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      color: 0x8b7bd8,
      size: 0.35,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.6,
    });
    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    // Floating wireframe spheres for depth
    const sphereGeometry = new THREE.IcosahedronGeometry(1, 2);
    const sphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x8b7bd8,
      wireframe: true,
      opacity: 0.08,
      transparent: true,
    });
    const spheres: THREE.Mesh[] = [];
    for (let i = 0; i < 4; i++) {
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.position.set((Math.random() - 0.5) * 60, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 30);
      sphere.scale.setScalar(Math.random() * 3 + 2);
      scene.add(sphere);
      spheres.push(sphere);
    }

    const mouse = { x: 0, y: 0 };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    // Fade with scroll: fully visible on the hero, gone after ~1 screen
    let visibility = 1;
    const handleScroll = () => {
      visibility = Math.max(0, 1 - window.scrollY / (window.innerHeight * 0.9));
      container.style.opacity = String(visibility);
    };
    handleScroll();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });

    let animationId = 0;
    const animate = () => {
      animationId = requestAnimationFrame(animate);
      if (visibility === 0 || document.hidden) return;

      particles.rotation.y += 0.0004;
      spheres.forEach((s, i) => {
        s.rotation.x += 0.001 + i * 0.0003;
        s.rotation.y += 0.0015;
      });

      camera.position.x += (mouse.x * 6 - camera.position.x) * 0.03;
      camera.position.y += (mouse.y * 6 - camera.position.y) * 0.03;
      camera.lookAt(scene.position);

      const attr = geometry.getAttribute("position");
      const arr = attr.array as Float32Array;
      for (let i = 0; i < arr.length; i += 3) {
        arr[i] += velocities[i];
        arr[i + 1] += velocities[i + 1];
        arr[i + 2] += velocities[i + 2];
        if (arr[i] > 50 || arr[i] < -50) velocities[i] *= -1;
        if (arr[i + 1] > 50 || arr[i + 1] < -50) velocities[i + 1] *= -1;
        if (arr[i + 2] > 50 || arr[i + 2] < -50) velocities[i + 2] *= -1;
      }
      attr.needsUpdate = true;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      container.removeChild(renderer.domElement);
      geometry.dispose();
      material.dispose();
      sphereGeometry.dispose();
      sphereMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    />
  );
}
