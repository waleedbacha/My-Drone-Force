import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Html } from "@react-three/drei";

// Custom 3D Drone Component
const DroneModel = () => {
  const droneRef = useRef();
  const propellerRefs = useRef([]);

  useFrame(() => {
    if (droneRef.current) {
      // Gentle hovering animation
      droneRef.current.position.y = Math.sin(Date.now() * 0.002) * 0.1;
      droneRef.current.rotation.y += 0.003;
    }

    // Spin propellers
    propellerRefs.current.forEach((prop, i) => {
      if (prop) {
        prop.rotation.z += 0.2;
      }
    });
  });

  return (
    <group ref={droneRef}>
      {/* Ambient and directional lights for better visibility */}
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-5, 5, 5]} intensity={0.5} />
      <directionalLight position={[5, 10, 5]} intensity={0.8} />

      {/* Main Drone Body */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.9, 0.25, 0.9]} />
        <meshStandardMaterial
          color="#0066cc"
          metalness={0.85}
          roughness={0.15}
          emissive="#001133"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Top Dome */}
      <mesh position={[0, 0.25, 0]}>
        <sphereGeometry args={[0.35, 48, 48]} />
        <meshStandardMaterial
          color="#3b82f6"
          metalness={0.7}
          roughness={0.2}
          emissive="#0044aa"
          emissiveIntensity={0.2}
        />
      </mesh>

      {/* Camera/Gimbal */}
      <mesh position={[0, -0.15, 0.4]}>
        <sphereGeometry args={[0.15, 24, 24]} />
        <meshStandardMaterial color="#222" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[0, -0.2, 0.5]}>
        <cylinderGeometry args={[0.08, 0.08, 0.1, 8]} />
        <meshStandardMaterial color="#ff4444" metalness={0.3} />
      </mesh>

      {/* Arms */}
      {[
        { pos: [-0.7, 0, -0.7], rot: 0 },
        { pos: [0.7, 0, -0.7], rot: 0 },
        { pos: [-0.7, 0, 0.7], rot: 0 },
        { pos: [0.7, 0, 0.7], rot: 0 },
      ].map((arm, i) => (
        <mesh key={`arm-${i}`} position={arm.pos} rotation={[0, arm.rot, 0]}>
          <boxGeometry args={[0.7, 0.08, 0.15]} />
          <meshStandardMaterial color="#555" metalness={0.6} />
        </mesh>
      ))}

      {/* Propellers with spinning animation */}
      {[
        { pos: [-1.05, 0.12, -1.05], rot: 0 },
        { pos: [1.05, 0.12, -1.05], rot: 0 },
        { pos: [-1.05, 0.12, 1.05], rot: 0 },
        { pos: [1.05, 0.12, 1.05], rot: 0 },
      ].map((prop, i) => (
        <mesh
          key={`prop-${i}`}
          position={prop.pos}
          ref={(el) => (propellerRefs.current[i] = el)}
        >
          <boxGeometry args={[0.6, 0.05, 0.1]} />
          <meshStandardMaterial color="#aaa" metalness={0.8} />
        </mesh>
      ))}

      {/* LED Lights */}
      <mesh position={[-0.5, 0.1, -0.5]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial
          color="#ff0000"
          emissive="#ff0000"
          emissiveIntensity={0.6}
        />
      </mesh>
      <mesh position={[0.5, 0.1, -0.5]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial
          color="#00ff00"
          emissive="#00ff00"
          emissiveIntensity={0.6}
        />
      </mesh>
      <mesh position={[-0.5, 0.1, 0.5]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial
          color="#ff6600"
          emissive="#ff6600"
          emissiveIntensity={0.5}
        />
      </mesh>
      <mesh position={[0.5, 0.1, 0.5]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshStandardMaterial
          color="#0066ff"
          emissive="#0066ff"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
};

// Wrapper Component with Canvas
const RealDrone3D = ({ className = "" }) => {
  return (
    <div
      className={className}
      style={{ width: "100%", height: "400px", position: "relative" }}
    >
      <Canvas
        camera={{ position: [3, 2, 4], fov: 45 }}
        style={{ background: "transparent" }}
        gl={{ alpha: true }}
      >
        <Suspense
          fallback={
            <Html center>
              <div style={{ color: "var(--text-primary)" }}>
                Loading 3D Drone...
              </div>
            </Html>
          }
        >
          <DroneModel />
        </Suspense>

        <OrbitControls
          enableZoom={true}
          enablePan={false}
          autoRotate={false}
          maxPolarAngle={Math.PI / 2}
          minDistance={2}
          maxDistance={8}
        />
      </Canvas>
    </div>
  );
};

export default RealDrone3D;
