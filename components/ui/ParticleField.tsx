import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { useIntro } from '../../context/IntroContext';

/**
 * A single particle system that morphs between three formations as the user scrolls:
 *   0 → a breathing sphere (the "core")
 *   1 → a torus knot (the "network")
 *   2 → an undulating data plane (the "infrastructure")
 * On load the particles fly in from a random cloud and assemble into the sphere.
 * The cursor pushes particles away in screen space.
 */

const Points = 'points' as any;
const BufferGeometry = 'bufferGeometry' as any;
const BufferAttribute = 'bufferAttribute' as any;
const ShaderMaterial = 'shaderMaterial' as any;
const Color = 'color' as any;

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uMorph;
  uniform float uIntro;
  uniform float uPixelRatio;
  uniform float uSize;
  uniform float uAspect;
  uniform float uDim;
  uniform vec2 uMouse;

  attribute vec3 aKnot;
  attribute vec3 aGrid;
  attribute vec3 aRandom;
  attribute float aSeed;

  varying vec3 vColor;
  varying float vAlpha;

  void main() {
    // Sphere breathes with a travelling wave
    vec3 sphere = position * (1.0 + 0.07 * sin(uTime * 1.4 + position.y * 2.2 + aSeed * 6.2831));

    // Knot shimmers a little
    vec3 knot = aKnot + 0.06 * vec3(sin(uTime + aSeed * 40.0), cos(uTime * 1.3 + aSeed * 30.0), sin(uTime * 0.7 + aSeed * 20.0));

    // Data plane undulates
    vec3 grid = aGrid;
    grid.y += sin(grid.x * 0.55 + uTime * 0.9) * 0.55 + cos(grid.z * 0.9 + uTime * 0.7) * 0.35;

    vec3 p;
    if (uMorph < 1.0) {
      p = mix(sphere, knot, smoothstep(0.0, 1.0, uMorph));
    } else {
      p = mix(knot, grid, smoothstep(0.0, 1.0, uMorph - 1.0));
    }

    // Intro: particles gather from a wide random cloud, staggered by seed
    float t = clamp(uIntro * 1.6 - aSeed * 0.6, 0.0, 1.0);
    t = 1.0 - pow(1.0 - t, 3.0);
    p = mix(aRandom, p, t);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);

    // Cursor repulsion in screen space
    vec4 clip = projectionMatrix * mv;
    vec2 ndc = clip.xy / clip.w;
    vec2 d = (ndc - uMouse) * vec2(uAspect, 1.0);
    float dist = length(d);
    float force = smoothstep(0.42, 0.0, dist);
    mv.xy += normalize(d + 0.0001) * force * 0.9;

    gl_Position = projectionMatrix * mv;
    gl_PointSize = uSize * uPixelRatio * (0.45 + aSeed) * (1.0 / -mv.z);

    vec3 cyan = vec3(0.05, 0.84, 0.91);
    vec3 blue = vec3(0.15, 0.35, 1.0);
    vec3 violet = vec3(0.55, 0.36, 0.96);
    vColor = mix(cyan, blue, aSeed);
    vColor = mix(vColor, violet, smoothstep(1.2, 2.0, uMorph) * aSeed);
    vColor += force * 0.9;
    vAlpha = (0.35 + 0.65 * aSeed) * (0.25 + 0.75 * t) * uDim * 0.9;
  }
`;

const fragmentShader = /* glsl */ `
  varying vec3 vColor;
  varying float vAlpha;
  void main() {
    float d = length(gl_PointCoord - 0.5);
    float a = smoothstep(0.5, 0.0, d);
    a = pow(a, 1.6);
    gl_FragColor = vec4(vColor, a * vAlpha);
  }
`;

function buildFormations(count: number) {
  const sphere = new Float32Array(count * 3);
  const knot = new Float32Array(count * 3);
  const grid = new Float32Array(count * 3);
  const random = new Float32Array(count * 3);
  const seed = new Float32Array(count);

  const golden = Math.PI * (3 - Math.sqrt(5));
  const cols = Math.ceil(Math.sqrt(count * 2.2));
  const rows = Math.ceil(count / cols);

  for (let i = 0; i < count; i++) {
    // Fibonacci sphere
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const theta = golden * i;
    const R = 2.9;
    sphere[i * 3] = Math.cos(theta) * r * R;
    sphere[i * 3 + 1] = y * R;
    sphere[i * 3 + 2] = Math.sin(theta) * r * R;

    // Torus knot (p=2, q=3) with a thin tube of scatter
    const u = (i / count) * Math.PI * 2 * 1.0;
    const p = 2, q = 3;
    const kr = 2.0 + Math.cos(q * u) * 0.9;
    const tube = 0.28 * Math.cbrt(Math.random());
    const ta = Math.random() * Math.PI * 2;
    knot[i * 3] = kr * Math.cos(p * u) * 1.15 + Math.cos(ta) * tube;
    knot[i * 3 + 1] = kr * Math.sin(p * u) * 1.15 + Math.sin(ta) * tube;
    knot[i * 3 + 2] = Math.sin(q * u) * 1.1 + Math.cos(ta * 1.7) * tube;

    // Data plane grid
    const cx = i % cols;
    const cz = Math.floor(i / cols);
    grid[i * 3] = (cx / (cols - 1) - 0.5) * 26;
    grid[i * 3 + 1] = -2.2;
    grid[i * 3 + 2] = (cz / (rows - 1) - 0.5) * 12 - 1;

    // Random intro cloud
    const rr = 14 + Math.random() * 16;
    const a1 = Math.random() * Math.PI * 2;
    const a2 = Math.acos(2 * Math.random() - 1);
    random[i * 3] = rr * Math.sin(a2) * Math.cos(a1);
    random[i * 3 + 1] = rr * Math.sin(a2) * Math.sin(a1);
    random[i * 3 + 2] = rr * Math.cos(a2) - 6;

    seed[i] = Math.random();
  }
  return { sphere, knot, grid, random, seed };
}

const Field: React.FC<{ count: number }> = ({ count }) => {
  const pointsRef = useRef<THREE.Points>(null!);
  const matRef = useRef<THREE.ShaderMaterial>(null!);
  const { introDone } = useIntro();
  const { size, gl } = useThree();
  const morph = useRef(0);
  const intro = useRef(0);
  const mouse = useRef(new THREE.Vector2(10, 10));

  const data = useMemo(() => buildFormations(count), [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMorph: { value: 0 },
      uIntro: { value: 0 },
      uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      uSize: { value: 70 },
      uAspect: { value: 1 },
      uDim: { value: 1 },
      uMouse: { value: new THREE.Vector2(10, 10) },
    }),
    []
  );

  useFrame((state, delta) => {
    const u = matRef.current?.uniforms;
    if (!u) return;
    const dt = Math.min(delta, 0.05);
    u.uTime.value += dt;
    u.uAspect.value = size.width / size.height;
    u.uPixelRatio.value = gl.getPixelRatio();

    // Intro gather
    if (introDone) intro.current = Math.min(1, intro.current + dt * 0.55);
    u.uIntro.value = intro.current;

    // Scroll → formation
    const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    const prog = window.scrollY / max;
    let target = 0;
    if (prog < 0.08) target = 0;
    else if (prog < 0.3) target = (prog - 0.08) / 0.22;
    else if (prog < 0.45) target = 1;
    else if (prog < 0.7) target = 1 + (prog - 0.45) / 0.25;
    else target = 2;
    morph.current += (target - morph.current) * Math.min(1, dt * 3);
    u.uMorph.value = morph.current;

    // Step back behind dense content so text stays legible; full strength in hero & contact
    const dimTarget = prog < 0.04 ? 1 : prog > 0.9 ? 0.6 : 0.45;
    u.uDim.value += (dimTarget - u.uDim.value) * Math.min(1, dt * 2.5);

    // Cursor (lerped so the "wake" feels fluid)
    const px = state.pointer.x;
    const py = state.pointer.y;
    mouse.current.x += (px - mouse.current.x) * Math.min(1, dt * 6);
    mouse.current.y += (py - mouse.current.y) * Math.min(1, dt * 6);
    u.uMouse.value.copy(mouse.current);

    // Group motion: slow spin + parallax + scroll-driven roll
    const g = pointsRef.current;
    if (g) {
      g.rotation.y += dt * (0.08 + (1 - Math.min(1, morph.current)) * 0.1);
      g.rotation.x += ((-py * 0.25 + (morph.current > 1.5 ? 0.35 : 0)) - g.rotation.x) * Math.min(1, dt * 2);
      g.rotation.z = Math.sin(u.uTime.value * 0.15) * 0.08 + prog * 0.6;
      const narrow = size.width < 768;
      const targetX = narrow ? 0 : morph.current < 0.5 ? 2.2 : 0;
      g.position.x += (targetX - g.position.x) * Math.min(1, dt * 2);
    }
  });

  return (
    <Points ref={pointsRef}>
      <BufferGeometry>
        <BufferAttribute attach="attributes-position" count={count} array={data.sphere} itemSize={3} />
        <BufferAttribute attach="attributes-aKnot" count={count} array={data.knot} itemSize={3} />
        <BufferAttribute attach="attributes-aGrid" count={count} array={data.grid} itemSize={3} />
        <BufferAttribute attach="attributes-aRandom" count={count} array={data.random} itemSize={3} />
        <BufferAttribute attach="attributes-aSeed" count={count} array={data.seed} itemSize={1} />
      </BufferGeometry>
      <ShaderMaterial
        ref={matRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
};

export const ParticleField: React.FC = () => {
  const count = typeof window !== 'undefined' && window.innerWidth < 768 ? 4500 : 9000;
  return (
    <div className="fixed inset-0 z-0 bg-navy-950" aria-hidden="true">
      <Canvas camera={{ position: [0, 0, 9], fov: 60 }} dpr={[1, 2]} gl={{ antialias: false, alpha: false }}>
        <Color attach="background" args={['#000c1a']} />
        <Field count={count} />
      </Canvas>
      {/* Depth: vignette + bottom fade */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_center,_transparent_30%,_#000c1a_95%)]" />
    </div>
  );
};
