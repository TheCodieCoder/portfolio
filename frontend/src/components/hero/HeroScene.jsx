import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, Sphere } from '@react-three/drei';
import * as THREE from 'three';
import { useIsMobile } from '../../hooks/useMediaQuery';

const InteractiveOrb = ({ mouse, isMobile }) => {
  const groupRef = useRef();
  const lightRef = useRef();

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (groupRef.current) {
      if (isMobile) {
        groupRef.current.rotation.y = t * 0.25;
        groupRef.current.rotation.x = Math.sin(t * 0.3) * 0.15;
      } else {
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
          groupRef.current.rotation.y,
          mouse.current.x * 0.8,
          0.05
        );
        groupRef.current.rotation.x = THREE.MathUtils.lerp(
          groupRef.current.rotation.x,
          mouse.current.y * 0.5,
          0.05
        );
      }
    }
    if (lightRef.current && !isMobile) {
      lightRef.current.position.x = mouse.current.x * 3;
      lightRef.current.position.y = mouse.current.y * 3 + 2;
    }
  });

  return (
    <>
      <pointLight ref={lightRef} position={[2, 3, 4]} intensity={1.8} color="#a78bfa" />
      <pointLight position={[-3, -2, 2]} intensity={0.9} color="#22d3ee" />
      <ambientLight intensity={0.35} />
      <group
        ref={groupRef}
        position={[0, isMobile ? 0.9 : 0, 0]}
      >
        <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
          <Sphere args={[1.2, 64, 64]} scale={isMobile ? 0.68 : 1}>
            <MeshDistortMaterial
              color="#7c3aed"
              attach="material"
              distort={0.35}
              speed={2}
              roughness={0.15}
              metalness={0.85}
              emissive="#4c1d95"
              emissiveIntensity={0.25}
            />
          </Sphere>
        </Float>
        <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, isMobile ? 0.15 : 0, 0]}>
          <torusGeometry args={[1.25, isMobile ? 0.015 : 0.02, 16, 100]} />
          <meshStandardMaterial color="#22d3ee" emissive="#0891b2" emissiveIntensity={0.5} />
        </mesh>
      </group >
    </>
  );
};

const HeroScene = () => {
  const isMobile = useIsMobile();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (isMobile) return undefined;
    const onMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, [isMobile]);

  const dpr = useMemo(() => (isMobile ? [1, 1.5] : [1, 2]), [isMobile]);

  return (
    <div className="w-full h-[420px] sm:h-[400px] md:h-[500px] lg:h-[560px]" aria-hidden>
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        dpr={dpr}
        gl={{ antialias: true, alpha: true, powerPreference: isMobile ? 'low-power' : 'high-performance' }}
      >
        <InteractiveOrb mouse={mouse} isMobile={isMobile} />
      </Canvas>
    </div>
  );
};

export default HeroScene;
