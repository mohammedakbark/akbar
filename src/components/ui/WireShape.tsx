"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

type Kind = "ico" | "knot" | "torus";

function geometry(kind: Kind) {
  if (kind === "knot") return new THREE.TorusKnotGeometry(1.05, 0.34, 140, 14, 2, 3);
  if (kind === "torus") return new THREE.TorusGeometry(1.3, 0.5, 18, 48);
  return new THREE.IcosahedronGeometry(1.6, 1);
}

/**
 * Rotating white wireframe that tilts toward the cursor and drifts with scroll.
 * Plain three.js (no React renderer); only animates while on screen.
 */
export default function WireShape({ kind = "ico", speed = 1 }: { kind?: Kind; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current;
    if (!host) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    host.appendChild(renderer.domElement);
    renderer.domElement.style.display = "block";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    camera.position.z = 4.6;

    const geo = geometry(kind);
    const mat = new THREE.MeshBasicMaterial({
      color: 0xe5e5e5,
      wireframe: true,
      transparent: true,
      opacity: kind === "ico" ? 0.75 : 0.45,
    });
    const mesh = new THREE.Mesh(geo, mat);
    scene.add(mesh);

    const resize = () => {
      const { width, height } = host.getBoundingClientRect();
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(host);

    const pointer = { x: 0, y: 0 };
    const onMove = (e: MouseEvent) => {
      pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.y = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener("mousemove", onMove);

    let visible = true;
    const io = new IntersectionObserver(([entry]) => (visible = entry.isIntersecting));
    io.observe(host);

    const clock = new THREE.Clock();
    let raf = 0;
    const loop = () => {
      raf = requestAnimationFrame(loop);
      const dt = Math.min(clock.getDelta(), 0.05);
      if (!visible) return;
      if (!reduced) {
        mesh.rotation.y += dt * 0.25 * speed;
        mesh.rotation.x += (pointer.y * 0.6 - mesh.rotation.x) * 0.04;
        mesh.rotation.z += (-pointer.x * 0.4 - mesh.rotation.z) * 0.04;
        mesh.position.y = Math.sin(window.scrollY * 0.0015) * 0.15;
      }
      renderer.render(scene, camera);
    };
    loop();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("mousemove", onMove);
      geo.dispose();
      mat.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, [kind, speed]);

  return <div ref={ref} className="h-full w-full" aria-hidden />;
}
