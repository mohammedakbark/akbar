"use client";

import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, OrbitControls } from "@react-three/drei";

/**
 * DataStreamMesh Component
 * - Creates an interactive 3D point cloud with connecting lines
 * - Points respond to mouse movements for parallax effect
 * - Continuously rotates and animates
 */
function DataStreamMesh() {
  const ref = useRef<any>(null);
  const { mouse } = useThree();
  const [points, setPoints] = useState<Float32Array | null>(null);

  useEffect(() => {
    // Generate random points for the point cloud
    // Creating a sphere-like distribution of 500 points
    const pointsArray = new Float32Array(1500); // 500 points * 3 (x, y, z)

    // Use seeded random generation for consistent results
    for (let i = 0; i < 500; i++) {
      const index = i * 3;

      // Generate points in a sphere with some randomness
      const radius = Math.random() * 2 + 0.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;

      pointsArray[index] = radius * Math.sin(phi) * Math.cos(theta);
      pointsArray[index + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pointsArray[index + 2] = radius * Math.cos(phi);
    }

    setPoints(pointsArray);
  }, []);

  useFrame(() => {
    if (!ref.current) return;

    // Rotate the mesh continuously
    ref.current.rotation.x += 0.0002;
    ref.current.rotation.y += 0.0003;
    ref.current.rotation.z += 0.0001;

    // Apply mouse parallax effect
    ref.current.rotation.x += mouse.y * 0.0002;
    ref.current.rotation.y += mouse.x * 0.0002;
  });

  if (!points) return null;

  return (
    <group ref={ref}>
      <Points positions={points} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#e53935"
          size={0.02}
          sizeAttenuation={true}
          depthWrite={false}
          opacity={0.6}
        />
      </Points>
    </group>
  );
}

/**
 * DataStreamCanvas Component
 * - Main Canvas that renders the 3D scene
 * - Provides the Three.js context and rendering
 * - Responsive to window size
 */
export default function DataStreamCanvas() {
  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 75 }}
        dpr={[1, 2]}
        performance={{ min: 0.1, max: 0.5 }}
      >
        {/* Ambient light for overall illumination */}
        <ambientLight intensity={0.5} color="#ffffff" />

        {/* Point light for dynamic lighting */}
        <pointLight position={[10, 10, 10]} intensity={0.8} />

        {/* 3D Data Stream Mesh */}
        <DataStreamMesh />

        {/* Orbit controls for interaction (disabled by default, enabled on hover) */}
        <OrbitControls
          autoRotate
          autoRotateSpeed={2}
          enableDamping
          dampingFactor={0.05}
          enableZoom={false}
          enablePan={false}
        />
      </Canvas>
    </div>
  );
}
