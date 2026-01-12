import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// --- Configuration ---
const PARTICLE_COUNT = 150; // Balanced for performance & visual density
const CONNECTION_DISTANCE = 3.5; // Max distance to draw a line
const MOUSE_INFLUENCE = 0.5; // How much mouse rotates the grid

// Define R3F components as any to bypass TypeScript IntrinsicElements checks
const Group = 'group' as any;
const Points = 'points' as any;
const BufferGeometry = 'bufferGeometry' as any;
const BufferAttribute = 'bufferAttribute' as any;
const PointsMaterial = 'pointsMaterial' as any;
const LineSegments = 'lineSegments' as any;
const LineBasicMaterial = 'lineBasicMaterial' as any;

// --- Neural Network Component ---
const NeuralNetwork = () => {
  const pointsRef = useRef<THREE.Points>(null!);
  const linesRef = useRef<THREE.LineSegments>(null!);
  
  // Mouse position
  const mouse = useRef(new THREE.Vector2(0, 0));

  // Initialize Particles (Neurons)
  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(PARTICLE_COUNT * 3);
    const vel = [];
    
    // Spread particles in a wide volume to form a "field"
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x = (Math.random() - 0.5) * 25; // Wide width
      const y = (Math.random() - 0.5) * 15; // Moderate height
      const z = (Math.random() - 0.5) * 10; // Shallower depth
      
      pos[i * 3] = x;
      pos[i * 3 + 1] = y;
      pos[i * 3 + 2] = z;

      // Random slow velocity for organic drift
      vel.push({
        x: (Math.random() - 0.5) * 0.02,
        y: (Math.random() - 0.5) * 0.02,
        z: (Math.random() - 0.5) * 0.02
      });
    }
    return [pos, vel];
  }, []);

  // Initialize Lines Geometry (Axons)
  const linesGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    // Max possible lines: PARTICLE_COUNT * PARTICLE_COUNT (over-provisioned buffer)
    // We will limit drawRange dynamically
    const maxConnections = PARTICLE_COUNT * PARTICLE_COUNT;
    const positions = new Float32Array(maxConnections * 3); 
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geometry;
  }, []);

  // Animation Loop
  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current) return;

    const time = state.clock.getElapsedTime();

    // 1. Update Particles Position
    const positionsAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const array = positionsAttr.array as Float32Array;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      // Apply velocity
      array[i * 3] += velocities[i].x;
      array[i * 3 + 1] += velocities[i].y;
      array[i * 3 + 2] += velocities[i].z;

      // Bounce off invisible walls (Keep them in frame)
      if (Math.abs(array[i * 3]) > 15) velocities[i].x *= -1;
      if (Math.abs(array[i * 3 + 1]) > 10) velocities[i].y *= -1;
      if (Math.abs(array[i * 3 + 2]) > 8) velocities[i].z *= -1;
    }
    positionsAttr.needsUpdate = true;

    // 2. Update Connections (The "Neural Grid" Logic)
    const linePositions = linesRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const lineArray = linePositions.array as Float32Array;
    let lineIndex = 0;

    // Connect particles if they are close enough
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const x1 = array[i * 3];
      const y1 = array[i * 3 + 1];
      const z1 = array[i * 3 + 2];

      // Optimization: Only check a subset or upper triangle to avoid double drawing
      for (let j = i + 1; j < PARTICLE_COUNT; j++) {
        const x2 = array[j * 3];
        const y2 = array[j * 3 + 1];
        const z2 = array[j * 3 + 2];

        const dist = Math.sqrt(
          Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2) + Math.pow(z2 - z1, 2)
        );

        if (dist < CONNECTION_DISTANCE) {
          // Point A
          lineArray[lineIndex++] = x1;
          lineArray[lineIndex++] = y1;
          lineArray[lineIndex++] = z1;
          // Point B
          lineArray[lineIndex++] = x2;
          lineArray[lineIndex++] = y2;
          lineArray[lineIndex++] = z2;
        }
      }
    }

    // Only draw the lines we actually calculated
    linesRef.current.geometry.setDrawRange(0, lineIndex / 3);
    linePositions.needsUpdate = true;

    // 3. Global Rotation (Mouse Interaction + Idle Spin)
    // Smoothly interpolate mouse values
    const targetX = (state.pointer.x * MOUSE_INFLUENCE);
    const targetY = (state.pointer.y * MOUSE_INFLUENCE);

    // Group Rotation
    const group = pointsRef.current.parent;
    if(group) {
        group.rotation.y += (targetX * 0.5 - group.rotation.y) * 0.05;
        group.rotation.x += (-targetY * 0.5 - group.rotation.x) * 0.05;
        // Idle gentle rotation
        group.rotation.z = Math.sin(time * 0.1) * 0.05;
    }
  });

  return (
    <Group>
      {/* Neurons (Dots) */}
      <Points ref={pointsRef}>
        <BufferGeometry>
          <BufferAttribute
            attach="attributes-position"
            count={PARTICLE_COUNT}
            array={positions}
            itemSize={3}
          />
        </BufferGeometry>
        <PointsMaterial
          size={0.15}
          color="#0DD6E8" // Electric Cyan
          transparent
          opacity={0.8}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>

      {/* Synapses (Lines) */}
      <LineSegments ref={linesRef} geometry={linesGeometry}>
        <LineBasicMaterial
          color="#00B8D4" // Darker Cyan/Blue
          transparent
          opacity={0.15} // Subtle connections
          linewidth={1}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </LineSegments>
    </Group>
  );
};

export const NeuralCanvas: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 bg-navy-900">
      <Canvas camera={{ position: [0, 0, 10], fov: 60 }} dpr={[1, 2]}>
        <NeuralNetwork />
      </Canvas>
      
      {/* Vignette & Gradients for Depth */}
      <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-navy-900/80 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#001a33_100%)] opacity-80 pointer-events-none" />
    </div>
  );
};