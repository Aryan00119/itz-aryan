"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { RotateCw } from "lucide-react";

export default function Avatar3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth || 380;
    let height = container.clientHeight || 380;

    // --- Scene, Camera, Renderer ---
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.1, 1000);
    camera.position.set(0, 0.15, 4.6);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    container.appendChild(renderer.domElement);

    // --- Studio Lighting tailored for Memoji Portrait ---
    const ambientLight = new THREE.AmbientLight(0xfff7ed, 1.4);
    scene.add(ambientLight);

    // Key Light (Warm soft studio fill)
    const keyLight = new THREE.DirectionalLight(0xffedd5, 3.2);
    keyLight.position.set(3, 4, 4);
    scene.add(keyLight);

    // Cool Purple Rim Light (Edges of hair and glasses)
    const rimLight = new THREE.DirectionalLight(0x8b5cf6, 2.6);
    rimLight.position.set(-3.5, 3, -3);
    scene.add(rimLight);

    // Soft Chin Uplight
    const bounceLight = new THREE.DirectionalLight(0xfde68a, 1.2);
    bounceLight.position.set(0, -3, 2);
    scene.add(bounceLight);

    // Dynamic Cursor Point Light (casts specular glints on glasses lenses & eyes)
    const cursorLight = new THREE.PointLight(0xfffbeb, 2.2, 7);
    cursorLight.position.set(0, 0, 3);
    scene.add(cursorLight);

    // --- Main Avatar Root Group ---
    const avatarRoot = new THREE.Group();
    avatarRoot.position.y = -0.15;
    scene.add(avatarRoot);

    // --- Materials matching the Apple Memoji ---
    // Soft peach skin
    const skinMat = new THREE.MeshStandardMaterial({
      color: 0xf5d0b5,
      roughness: 0.62,
      metalness: 0.05,
    });

    // Rosy cheek blush
    const blushMat = new THREE.MeshStandardMaterial({
      color: 0xf472b6,
      roughness: 0.9,
      transparent: true,
      opacity: 0.38,
    });

    // Curly matte black hair
    const hairMat = new THREE.MeshStandardMaterial({
      color: 0x181716,
      roughness: 0.85,
      metalness: 0.15,
    });

    // Matte dark charcoal glasses frame
    const frameMat = new THREE.MeshStandardMaterial({
      color: 0x27272a,
      roughness: 0.35,
      metalness: 0.45,
    });

    // Reflective transparent glass lenses
    const glassLensMat = new THREE.MeshPhysicalMaterial({
      color: 0xffffff,
      transmission: 0.88,
      opacity: 1,
      transparent: true,
      roughness: 0.08,
      ior: 1.52,
      reflectivity: 0.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.08,
    });

    // Eye Materials
    const scleraMat = new THREE.MeshBasicMaterial({ color: 0xf8fafc });
    const irisMat = new THREE.MeshStandardMaterial({
      color: 0x3d2314, // Dark warm hazel brown
      roughness: 0.3,
    });
    const pupilMat = new THREE.MeshBasicMaterial({ color: 0x09090b });
    const eyeCatchlightMat = new THREE.MeshBasicMaterial({ color: 0xffffff });

    // Lips Material
    const lipsMat = new THREE.MeshStandardMaterial({
      color: 0xcd897e,
      roughness: 0.65,
    });

    // Eyebrows Material
    const eyebrowMat = new THREE.MeshStandardMaterial({
      color: 0x1f1d1b,
      roughness: 0.85,
    });

    // Purple Halo Ring Material
    const haloMat = new THREE.MeshBasicMaterial({
      color: 0x6d28d9,
      transparent: true,
      opacity: 0.45,
    });

    // --- Head Group (Rotates and tracks mouse) ---
    const headGroup = new THREE.Group();
    avatarRoot.add(headGroup);

    // 1. Head Base (Soft round Memoji shape)
    const headGeo = new THREE.SphereGeometry(0.72, 48, 48);
    headGeo.scale(1.0, 1.08, 0.98);
    const headMesh = new THREE.Mesh(headGeo, skinMat);
    headGroup.add(headMesh);

    // Chin / rounded jaw definition
    const chinGeo = new THREE.SphereGeometry(0.38, 32, 32);
    chinGeo.scale(1.05, 0.85, 1.05);
    const chinMesh = new THREE.Mesh(chinGeo, skinMat);
    chinMesh.position.set(0, -0.42, 0.22);
    headGroup.add(chinMesh);

    // Cheeks with rosy blush
    [-0.34, 0.34].forEach((side) => {
      const blushGeo = new THREE.SphereGeometry(0.18, 24, 24);
      blushGeo.scale(1.1, 0.7, 0.35);
      const blushMesh = new THREE.Mesh(blushGeo, blushMat);
      blushMesh.position.set(side, -0.16, 0.61);
      headGroup.add(blushMesh);
    });

    // 2. Ears
    [-0.72, 0.72].forEach((side) => {
      const earGroup = new THREE.Group();
      earGroup.position.set(side, -0.05, 0);

      const outerEarGeo = new THREE.TorusGeometry(0.16, 0.055, 16, 24, Math.PI * 1.25);
      outerEarGeo.rotateZ(side > 0 ? -Math.PI / 4 : Math.PI * 1.25);
      const outerEarMesh = new THREE.Mesh(outerEarGeo, skinMat);
      earGroup.add(outerEarMesh);

      const lobeGeo = new THREE.SphereGeometry(0.09, 16, 16);
      lobeGeo.scale(0.8, 1.2, 0.6);
      const lobeMesh = new THREE.Mesh(lobeGeo, skinMat);
      lobeMesh.position.set(0, -0.12, 0.02);
      earGroup.add(lobeMesh);

      headGroup.add(earGroup);
    });

    // 3. Volumetric Curly Hair Tuft Clumps (Matching the Apple Memoji's curly puff hair)
    const hairGroup = new THREE.Group();
    headGroup.add(hairGroup);

    // Hair cluster coordinates specifically sculpted for the curly afro/crop style
    const hairClumps = [
      // Top central curls
      { pos: [0, 0.86, 0.08], scale: [0.32, 0.36, 0.32] },
      { pos: [-0.22, 0.84, 0.12], scale: [0.28, 0.34, 0.28] },
      { pos: [0.22, 0.84, 0.12], scale: [0.28, 0.34, 0.28] },
      { pos: [-0.42, 0.76, 0.08], scale: [0.26, 0.32, 0.26] },
      { pos: [0.42, 0.76, 0.08], scale: [0.26, 0.32, 0.26] },

      // Front forehead curls (tilted forward)
      { pos: [-0.14, 0.74, 0.42], scale: [0.24, 0.28, 0.25] },
      { pos: [0.14, 0.74, 0.42], scale: [0.24, 0.28, 0.25] },
      { pos: [-0.32, 0.66, 0.38], scale: [0.24, 0.27, 0.24] },
      { pos: [0.32, 0.66, 0.38], scale: [0.24, 0.27, 0.24] },
      { pos: [0, 0.78, 0.34], scale: [0.26, 0.3, 0.26] },

      // Crown & back volume
      { pos: [0, 0.82, -0.22], scale: [0.34, 0.38, 0.34] },
      { pos: [-0.26, 0.78, -0.2], scale: [0.3, 0.35, 0.3] },
      { pos: [0.26, 0.78, -0.2], scale: [0.3, 0.35, 0.3] },
      { pos: [-0.48, 0.62, -0.12], scale: [0.28, 0.32, 0.28] },
      { pos: [0.48, 0.62, -0.12], scale: [0.28, 0.32, 0.28] },
      { pos: [0, 0.66, -0.42], scale: [0.32, 0.36, 0.32] },
      { pos: [-0.28, 0.52, -0.38], scale: [0.28, 0.32, 0.28] },
      { pos: [0.28, 0.52, -0.38], scale: [0.28, 0.32, 0.28] },

      // Left & Right side curls framing the face
      { pos: [-0.58, 0.48, 0.12], scale: [0.24, 0.28, 0.24] },
      { pos: [0.58, 0.48, 0.12], scale: [0.24, 0.28, 0.24] },
      { pos: [-0.62, 0.34, -0.05], scale: [0.22, 0.26, 0.22] },
      { pos: [0.62, 0.34, -0.05], scale: [0.22, 0.26, 0.22] },
      { pos: [-0.58, 0.18, -0.15], scale: [0.2, 0.24, 0.2] },
      { pos: [0.58, 0.18, -0.15], scale: [0.2, 0.24, 0.2] },

      // Sideburns
      { pos: [-0.64, 0.08, 0.14], scale: [0.14, 0.22, 0.14] },
      { pos: [0.64, 0.08, 0.14], scale: [0.14, 0.22, 0.14] },
    ];

    hairClumps.forEach((clump) => {
      const clumpGeo = new THREE.SphereGeometry(1, 16, 16);
      const clumpMesh = new THREE.Mesh(clumpGeo, hairMat);
      clumpMesh.position.set(clump.pos[0], clump.pos[1], clump.pos[2]);
      clumpMesh.scale.set(clump.scale[0], clump.scale[1], clump.scale[2]);
      hairGroup.add(clumpMesh);
    });

    // 4. Expressive Eyes & Eye Tracking Group
    const eyesGroup = new THREE.Group();
    headGroup.add(eyesGroup);

    const eyeLeftGroup = new THREE.Group();
    eyeLeftGroup.position.set(-0.24, 0.02, 0.58);
    const eyeRightGroup = new THREE.Group();
    eyeRightGroup.position.set(0.24, 0.02, 0.58);
    eyesGroup.add(eyeLeftGroup);
    eyesGroup.add(eyeRightGroup);

    [eyeLeftGroup, eyeRightGroup].forEach((eye) => {
      // White sclera
      const scleraGeo = new THREE.SphereGeometry(0.14, 24, 24);
      scleraGeo.scale(1.2, 0.95, 0.7);
      const scleraMesh = new THREE.Mesh(scleraGeo, scleraMat);
      eye.add(scleraMesh);

      // Dark brown iris
      const irisGeo = new THREE.CircleGeometry(0.085, 24);
      const irisMesh = new THREE.Mesh(irisGeo, irisMat);
      irisMesh.position.set(0, 0, 0.105);
      eye.add(irisMesh);

      // Black Pupil
      const pupilGeo = new THREE.CircleGeometry(0.05, 24);
      const pupilMesh = new THREE.Mesh(pupilGeo, pupilMat);
      pupilMesh.position.set(0, 0, 0.108);
      eye.add(pupilMesh);

      // White Specular Catchlight (vital for Memoji life)
      const catchlightGeo = new THREE.CircleGeometry(0.022, 16);
      const catchlightMesh = new THREE.Mesh(catchlightGeo, eyeCatchlightMat);
      catchlightMesh.position.set(0.025, 0.025, 0.11);
      eye.add(catchlightMesh);
    });

    // 5. Eyebrows (Arched & expressive dark arches)
    [-0.26, 0.26].forEach((side) => {
      const browGroup = new THREE.Group();
      browGroup.position.set(side, 0.23, 0.62);

      const browGeo = new THREE.BoxGeometry(0.22, 0.045, 0.04);
      const browMesh = new THREE.Mesh(browGeo, eyebrowMat);
      browMesh.rotation.z = side > 0 ? -0.16 : 0.16;
      browMesh.rotation.y = side > 0 ? 0.2 : -0.2;
      browGroup.add(browMesh);

      headGroup.add(browGroup);
    });

    // 6. Nose (Rounded button Memoji nose)
    const noseGeo = new THREE.SphereGeometry(0.085, 24, 24);
    noseGeo.scale(1.0, 0.85, 1.05);
    const noseMesh = new THREE.Mesh(noseGeo, skinMat);
    noseMesh.position.set(0, -0.12, 0.69);
    headGroup.add(noseMesh);

    // 7. Lips (Subtle relaxed neutral mouth)
    const mouthGroup = new THREE.Group();
    mouthGroup.position.set(0, -0.28, 0.63);

    const upperLipGeo = new THREE.TorusGeometry(0.12, 0.02, 12, 24, Math.PI * 0.7);
    upperLipGeo.rotateZ(Math.PI * 0.65);
    const upperLipMesh = new THREE.Mesh(upperLipGeo, lipsMat);
    mouthGroup.add(upperLipMesh);

    const lowerLipGeo = new THREE.BoxGeometry(0.12, 0.025, 0.03);
    const lowerLipMesh = new THREE.Mesh(lowerLipGeo, lipsMat);
    lowerLipMesh.position.set(0, -0.025, 0);
    mouthGroup.add(lowerLipMesh);

    headGroup.add(mouthGroup);

    // 8. Rectangular Glasses with Rounded Corners (Signature Identifier)
    const glassesGroup = new THREE.Group();
    glassesGroup.position.set(0, 0.02, 0.74);
    headGroup.add(glassesGroup);

    // Create rounded rectangular frames for left & right eye
    const createLensFrame = (xOffset: number) => {
      const frameSubGroup = new THREE.Group();
      frameSubGroup.position.x = xOffset;

      const rimWidth = 0.34;
      const rimHeight = 0.23;
      const thickness = 0.022;

      // Top & Bottom bars
      [-rimHeight / 2, rimHeight / 2].forEach((y) => {
        const barGeo = new THREE.BoxGeometry(rimWidth, thickness, thickness);
        const bar = new THREE.Mesh(barGeo, frameMat);
        bar.position.y = y;
        frameSubGroup.add(bar);
      });

      // Left & Right bars
      [-rimWidth / 2, rimWidth / 2].forEach((x) => {
        const barGeo = new THREE.BoxGeometry(thickness, rimHeight, thickness);
        const bar = new THREE.Mesh(barGeo, frameMat);
        bar.position.x = x;
        frameSubGroup.add(bar);
      });

      // Transparent Glass Lens inside frame
      const lensGeo = new THREE.PlaneGeometry(rimWidth - 0.02, rimHeight - 0.02);
      const lens = new THREE.Mesh(lensGeo, glassLensMat);
      lens.position.z = 0.005;
      frameSubGroup.add(lens);

      return frameSubGroup;
    };

    glassesGroup.add(createLensFrame(-0.25));
    glassesGroup.add(createLensFrame(0.25));

    // Nose Bridge connecting the two rims
    const bridgeGeo = new THREE.BoxGeometry(0.18, 0.022, 0.02);
    const bridgeMesh = new THREE.Mesh(bridgeGeo, frameMat);
    bridgeMesh.position.set(0, 0.02, 0);
    glassesGroup.add(bridgeMesh);

    // Side Temple Arms going back towards ears
    [-0.43, 0.43].forEach((side) => {
      const armGeo = new THREE.BoxGeometry(0.02, 0.02, 0.65);
      const armMesh = new THREE.Mesh(armGeo, frameMat);
      armMesh.position.set(side, 0.03, -0.32);
      armMesh.rotation.y = side > 0 ? 0.22 : -0.22;
      glassesGroup.add(armMesh);
    });

    // 9. Floating Gyroscopic Holographic Rings
    const ringGroup = new THREE.Group();
    avatarRoot.add(ringGroup);

    const ring1Geo = new THREE.TorusGeometry(1.4, 0.01, 16, 80);
    const ring1 = new THREE.Mesh(ring1Geo, haloMat);
    ring1.rotation.x = Math.PI / 3.2;
    ringGroup.add(ring1);

    const ring2Geo = new THREE.TorusGeometry(1.6, 0.008, 16, 80);
    const ring2 = new THREE.Mesh(ring2Geo, haloMat);
    ring2.rotation.y = Math.PI / 3.8;
    ringGroup.add(ring2);

    // 10. Ambient Golden Particle Sparks
    const particleCount = 140;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 4.5;
      positions[i + 1] = (Math.random() - 0.5) * 4.5;
      positions[i + 2] = (Math.random() - 0.5) * 3.5;
    }

    particleGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const particleMat = new THREE.PointsMaterial({
      color: 0x8b5cf6,
      size: 0.035,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    // --- Interactive Mouse & Drag Rotation ---
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };
    let dragRotation = { x: 0, y: 0 };
    let pulseScale = 1.0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;

      mouse.targetX = (clientX / rect.width) * 2 - 1;
      mouse.targetY = -(clientY / rect.height) * 2 + 1;

      // Update cursor light position for specular glints
      cursorLight.position.x = mouse.targetX * 2.0;
      cursorLight.position.y = mouse.targetY * 2.0 + 0.2;

      if (isDragging) {
        const deltaX = e.clientX - previousMousePosition.x;
        const deltaY = e.clientY - previousMousePosition.y;

        dragRotation.y += deltaX * 0.008;
        dragRotation.x = Math.max(-0.4, Math.min(0.4, dragRotation.x + deltaY * 0.006));

        previousMousePosition = { x: e.clientX, y: e.clientY };
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDragging = true;
      setIsInteracting(true);
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const handleMouseUp = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    const handleClick = () => {
      // Playful spring nod
      pulseScale = 1.07;
    };

    // Touch support for mobile devices
    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        isDragging = true;
        setIsInteracting(true);
        previousMousePosition = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches.length === 1) {
        const deltaX = e.touches[0].clientX - previousMousePosition.x;
        const deltaY = e.touches[0].clientY - previousMousePosition.y;

        dragRotation.y += deltaX * 0.008;
        dragRotation.x = Math.max(-0.4, Math.min(0.4, dragRotation.x + deltaY * 0.006));

        previousMousePosition = {
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        };
      }
    };

    const handleTouchEnd = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    container.addEventListener("mousedown", handleMouseDown);
    container.addEventListener("click", handleClick);
    container.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    window.addEventListener("touchend", handleTouchEnd);

    // --- Animation Loop ---
    const startTime = performance.now();
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = (performance.now() - startTime) * 0.001;

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.065;
      mouse.y += (mouse.targetY - mouse.y) * 0.065;

      // Spring decay for interactive click
      pulseScale += (1.0 - pulseScale) * 0.08;
      avatarRoot.scale.set(pulseScale, pulseScale, pulseScale);

      // Gentle breathing float
      avatarRoot.position.y = -0.15 + Math.sin(elapsedTime * 1.8) * 0.05;

      // Rotate gyroscopic rings
      ring1.rotation.x = Math.PI / 3.2 + elapsedTime * 0.35;
      ring1.rotation.y = elapsedTime * 0.25;
      ring2.rotation.y = Math.PI / 3.8 - elapsedTime * 0.3;
      ring2.rotation.z = elapsedTime * 0.2;

      // Dynamic Memoji Head Gaze Tracking
      const targetRotY = mouse.x * 0.6 + dragRotation.y;
      const targetRotX = -mouse.y * 0.4 + dragRotation.x;
      headGroup.rotation.y += (targetRotY - headGroup.rotation.y) * 0.08;
      headGroup.rotation.x += (targetRotX - headGroup.rotation.x) * 0.08;
      headGroup.rotation.z = -mouse.x * 0.1;

      // Subtle Eye Pupil Shift (Eyes genuinely look at cursor)
      eyeLeftGroup.position.x = -0.24 + mouse.x * 0.02;
      eyeLeftGroup.position.y = 0.02 + mouse.y * 0.02;
      eyeRightGroup.position.x = 0.24 + mouse.x * 0.02;
      eyeRightGroup.position.y = 0.02 + mouse.y * 0.02;

      // Drift floating particles
      particles.rotation.y = elapsedTime * 0.04;

      renderer.render(scene, camera);
    };

    animate();

    // --- Resize Handler ---
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || 380;
      height = container.clientHeight || 380;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // --- Cleanup on unmount ---
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      container.removeEventListener("mousedown", handleMouseDown);
      container.removeEventListener("click", handleClick);
      container.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      resizeObserver.disconnect();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      renderer.dispose();
      scene.clear();
    };
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing select-none">
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="w-full h-full" />

      {/* Floating 3D Interaction Pill Tag with Glass Effect */}
      <div
        className={`absolute bottom-3 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full glass-pill border border-amber-500/30 flex items-center gap-2 transition-all duration-300 pointer-events-none shadow-xl ${
          isInteracting ? "opacity-100 scale-105 border-amber-400" : "opacity-85 hover:opacity-100"
        }`}
      >
        <RotateCw className={`w-3.5 h-3.5 text-amber-400 ${isInteracting ? "animate-spin" : ""}`} />
        <span className="text-[11px] font-black uppercase tracking-wider text-amber-300">
          3D Memoji • Drag &amp; Rotate
        </span>
      </div>
    </div>
  );
}
