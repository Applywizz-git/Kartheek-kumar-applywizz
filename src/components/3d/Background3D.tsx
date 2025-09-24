import { Canvas } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import { OrbitControls, Float, Sphere, Ring, Torus } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface CodeStreamProps {
  position: [number, number, number];
}

const DataVisualization = ({ position }: CodeStreamProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const particlesRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      meshRef.current.rotation.y += 0.002;
    }
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001;
    }
  });

  // Create particles for data visualization effect
  const particleCount = 150;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 8;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
  }

  return (
    <group position={position}>
      <Float speed={1.5} rotationIntensity={0.1} floatIntensity={0.3}>
        <Sphere ref={meshRef} args={[0.6, 32, 32]}>
          <meshStandardMaterial
            color="#14B8A6"
            transparent
            opacity={0.4}
            wireframe
          />
        </Sphere>
      </Float>
      
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={particleCount}
            array={positions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#7C3AED"
          size={0.025}
          transparent
          opacity={0.7}
        />
      </points>
    </group>
  );
};

interface ETLPipelineProps {
  position: [number, number, number];
}

const ETLPipeline = ({ position }: ETLPipelineProps) => {
  const ringRef = useRef<THREE.Mesh>(null);
  const torusRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ringRef.current) {
      ringRef.current.rotation.z += 0.008;
    }
    if (torusRef.current) {
      torusRef.current.rotation.x += 0.006;
      torusRef.current.rotation.y += 0.01;
    }
  });

  return (
    <group position={position}>
      <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.2}>
        <Ring ref={ringRef} args={[1.8, 2.2, 32]}>
          <meshStandardMaterial
            color="#F59E0B"
            transparent
            opacity={0.25}
            side={THREE.DoubleSide}
          />
        </Ring>
        
        <Torus ref={torusRef} args={[1.2, 0.12, 16, 32]}>
          <meshStandardMaterial
            color="#14B8A6"
            transparent
            opacity={0.5}
          />
        </Torus>
      </Float>
    </group>
  );
};

interface DataNetworkProps {
  position: [number, number, number];
}

const DataNetwork = ({ position }: DataNetworkProps) => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += 0.004;
    }
  });

  return (
    <group ref={groupRef} position={position}>
      {/* Data nodes representing different data sources */}
      {[...Array(8)].map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 2.5;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.sin(i * 0.8) * 0.5;
        
        return (
          <Float key={i} speed={0.8 + i * 0.1} rotationIntensity={0.08}>
            <Sphere position={[x, y, z]} args={[0.15, 16, 16]}>
              <meshStandardMaterial
                color={i % 3 === 0 ? "#14B8A6" : i % 3 === 1 ? "#7C3AED" : "#F59E0B"}
                transparent
                opacity={0.7}
              />
            </Sphere>
          </Float>
        );
      })}
    </group>
  );
};

const Scene = () => {
  return (
    <>
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#14B8A6" />
      <pointLight position={[-10, -10, -10]} intensity={0.3} color="#7C3AED" />
      
      <DataVisualization position={[-4, 2, -2]} />
      <ETLPipeline position={[4, -1, -3]} />
      <DataNetwork position={[0, 0, -5]} />
      
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        autoRotate
        autoRotateSpeed={0.2}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
      />
    </>
  );
};

export const Background3D = () => {
  return (
    <div className="canvas-container">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60 }}
        dpr={[1, 2]}
        performance={{ min: 0.5 }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
};