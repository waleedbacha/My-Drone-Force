import React, { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF, Html, Environment } from "@react-three/drei";
import droneModel from "../../assests/models/drone.glb"; // Your .glb file

const DroneModel = () => {
  const droneRef = useRef();
  const { scene } = useGLTF(droneModel);

  useFrame(({ clock }) => {
    if (droneRef.current) {
      // Gentle hovering
      droneRef.current.position.y = Math.sin(clock.elapsedTime * 2) * 0.05;
      // Slow rotation
      droneRef.current.rotation.y += 0.002;
    }
  });

  return (
    <primitive
      ref={droneRef}
      object={scene}
      scale={1.2} // Increased from 0.8 or 1.0 to 1.2
      position={[0, 0, 0]}
    />
  );
};

const RealisticDrone = () => {
  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      <Canvas
        camera={{ position: [2, 1.5, 3], fov: 40 }} // Changed from [2.5, 1.8, 3.5] to [2, 1.5, 3]
        style={{ background: "transparent" }}
        gl={{ alpha: true }}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 10, 5]} intensity={1} />
        <Environment preset="city" />
        <Suspense fallback={<Html center>Loading 3D Drone...</Html>}>
          <DroneModel />
        </Suspense>
        <OrbitControls enableZoom={true} enablePan={false} />
      </Canvas>
      <div
        style={{
          position: "absolute",
          bottom: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          fontSize: "11px",
          color: "var(--text-secondary)",
          background: "var(--card-bg)",
          padding: "4px 12px",
          borderRadius: "20px",
          pointerEvents: "none",
        }}
      >
        🖱️ Drag to rotate | Scroll to zoom
      </div>
    </div>
  );
};

export default RealisticDrone;
