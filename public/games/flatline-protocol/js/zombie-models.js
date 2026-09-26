/**
 * ST. AGNES MERCY: FLATLINE PROTOCOL 3D
 * Realistic 3D Anatomical Zombie Models & Organic Horror Materials
 * (Eliminating polkadots and flat boxes - adding layered necrotic textures and beveled anatomies)
 */

(function (window) {
  'use strict';

  class RealisticZombieTextureFactory {
    constructor() {
      this.textures = {};
      this.materials = {};
      this.initTextures();
    }

    createCanvas(w = 512, h = 512) {
      const c = document.createElement('canvas');
      c.width = w; c.height = h;
      return c;
    }

    initTextures() {
      // 1. Necrotic Decomposing Skin (Grisly pale green-grey flesh, purplish veins, dried gore)
      const cSkin = this.createCanvas(512, 512);
      const ctxSkin = cSkin.getContext('2d');
      ctxSkin.fillStyle = '#3a4439';
      ctxSkin.fillRect(0, 0, 512, 512);

      // Noise & rotting discolorations
      for (let i = 0; i < 600; i++) {
        const x = Math.random() * 512;
        const y = Math.random() * 512;
        ctxSkin.fillStyle = Math.random() > 0.45 ? 'rgba(25, 35, 25, 0.4)' : 'rgba(65, 75, 58, 0.35)';
        ctxSkin.fillRect(x, y, 6 + Math.random() * 12, 6 + Math.random() * 12);
      }

      // Branching necrotic dark veins
      ctxSkin.strokeStyle = 'rgba(28, 14, 38, 0.7)';
      ctxSkin.lineWidth = 1.8;
      for (let i = 0; i < 20; i++) {
        let vx = Math.random() * 512;
        let vy = Math.random() * 512;
        ctxSkin.beginPath();
        ctxSkin.moveTo(vx, vy);
        for (let s = 0; s < 6; s++) {
          vx += (Math.random() - 0.5) * 45;
          vy += (Math.random() - 0.5) * 45;
          ctxSkin.lineTo(vx, vy);
        }
        ctxSkin.stroke();
      }

      // Deep dried arterial lacerations
      for (let i = 0; i < 12; i++) {
        const lx = Math.random() * 450;
        const ly = Math.random() * 450;
        ctxSkin.strokeStyle = 'rgba(65, 8, 8, 0.85)';
        ctxSkin.lineWidth = 3.5;
        ctxSkin.beginPath();
        ctxSkin.moveTo(lx, ly);
        ctxSkin.lineTo(lx + 35 + Math.random() * 50, ly + (Math.random() - 0.5) * 25);
        ctxSkin.stroke();
      }
      this.textures.skin = new THREE.CanvasTexture(cSkin);

      // 2. Realistic Blood-Soaked Medical Scrubs (NO polkadots - natural arterial splatter stains)
      const cScrubs = this.createCanvas(512, 512);
      const ctxScrubs = cScrubs.getContext('2d');
      ctxScrubs.fillStyle = '#22382f'; // Hospital scrub green
      ctxScrubs.fillRect(0, 0, 512, 512);

      // Fabric weave texture noise
      for (let y = 0; y < 512; y += 4) {
        ctxScrubs.fillStyle = 'rgba(10, 20, 15, 0.2)';
        ctxScrubs.fillRect(0, y, 512, 2);
      }

      // Large organic arterial blood soak (flowing stain across chest and stomach)
      const soakGrad = ctxScrubs.createRadialGradient(256, 280, 20, 256, 280, 180);
      soakGrad.addColorStop(0, 'rgba(45, 4, 4, 0.95)');   // Dark coagulated center
      soakGrad.addColorStop(0.5, 'rgba(85, 10, 10, 0.85)');
      soakGrad.addColorStop(0.85, 'rgba(130, 15, 15, 0.7)');
      soakGrad.addColorStop(1, 'rgba(130, 15, 15, 0)');
      ctxScrubs.fillStyle = soakGrad;
      this.drawOrganicShape(ctxScrubs, 256, 280, 160, 22, 0.5);

      // Jagged high-velocity arterial spray streaks
      for (let i = 0; i < 24; i++) {
        const sx = 100 + Math.random() * 312;
        const sy = 120 + Math.random() * 260;
        const len = 30 + Math.random() * 80;
        const angle = Math.random() * Math.PI * 2;
        ctxScrubs.strokeStyle = Math.random() > 0.4 ? 'rgba(80, 8, 8, 0.85)' : 'rgba(140, 16, 16, 0.75)';
        ctxScrubs.lineWidth = 2 + Math.random() * 4;
        ctxScrubs.beginPath();
        ctxScrubs.moveTo(sx, sy);
        ctxScrubs.lineTo(sx + Math.cos(angle) * len, sy + Math.sin(angle) * len);
        ctxScrubs.stroke();

        // Fine mist droplets
        ctxScrubs.fillStyle = 'rgba(110, 12, 12, 0.8)';
        ctxScrubs.beginPath();
        ctxScrubs.arc(sx + Math.cos(angle) * len, sy + Math.sin(angle) * len, 1.5 + Math.random() * 2.5, 0, Math.PI * 2);
        ctxScrubs.fill();
      }

      // Grime & mud along hem
      for (let i = 0; i < 40; i++) {
        ctxScrubs.fillStyle = 'rgba(15, 20, 15, 0.45)';
        ctxScrubs.fillRect(Math.random() * 512, 440 + Math.random() * 72, 8, 8);
      }
      this.textures.scrubs = new THREE.CanvasTexture(cScrubs);

      // Materials
      this.materials.skin = new THREE.MeshStandardMaterial({
        map: this.textures.skin,
        roughness: 0.65,
        metalness: 0.08
      });

      this.materials.scrubs = new THREE.MeshStandardMaterial({
        map: this.textures.scrubs,
        roughness: 0.82,
        metalness: 0.02
      });

      this.materials.bone = new THREE.MeshStandardMaterial({
        color: 0xc8c4b2,
        roughness: 0.55,
        metalness: 0.08
      });

      this.materials.flesh = new THREE.MeshStandardMaterial({
        color: 0x5a0808,
        roughness: 0.22,
        metalness: 0.15
      });

      this.materials.armor = new THREE.MeshStandardMaterial({
        color: 0x181d19,
        roughness: 0.75,
        metalness: 0.35
      });

      this.materials.bile = new THREE.MeshStandardMaterial({
        color: 0x99cc11,
        emissive: 0x77aa08,
        emissiveIntensity: 0.8,
        roughness: 0.18,
        metalness: 0.2
      });
    }

    drawOrganicShape(ctx, cx, cy, radius, points = 20, variance = 0.4) {
      ctx.beginPath();
      const step = (Math.PI * 2) / points;
      for (let i = 0; i <= points; i++) {
        const a = i * step;
        const r = radius * (1 + (Math.random() - 0.5) * variance);
        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();
    }
  }

  let texFactory = null;
  function getFactory() {
    if (!texFactory) texFactory = new RealisticZombieTextureFactory();
    return texFactory;
  }

  class RealisticZombieBuilder {
    static build(type, scale = 1.0) {
      const fact = getFactory();
      const group = new THREE.Group();

      let headGroup = null;
      let headMesh = null;
      let jawMesh = null;
      let armL = null, armR = null;
      let legL = null, legR = null;
      let animatedParts = [];

      switch (type) {
        case 'crawler':
          ({ headGroup, headMesh, jawMesh, armL, armR } = this.buildCrawler(group, fact, scale));
          break;
        case 'spitter':
          ({ headGroup, headMesh, jawMesh, armL, armR, legL, legR, animatedParts } = this.buildSpitter(group, fact, scale));
          break;
        case 'brute':
          ({ headGroup, headMesh, jawMesh, armL, armR, legL, legR } = this.buildBrute(group, fact, scale));
          break;
        case 'boss':
          ({ headGroup, headMesh, jawMesh, armL, armR, legL, legR, animatedParts } = this.buildBoss(group, fact, scale));
          break;
        case 'shambler':
        default:
          ({ headGroup, headMesh, jawMesh, armL, armR, legL, legR } = this.buildShambler(group, fact, scale));
          break;
      }

      group.traverse(child => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      return { group, headGroup, headMesh, jawMesh, armL, armR, legL, legR, animatedParts };
    }

    /* ---------------- 1. INFECTED SURGEON / SHAMBLER ---------------- */
    static buildShambler(group, fact, scale) {
      const s = scale;
      const skinMat = fact.materials.skin;
      const scrubsMat = fact.materials.scrubs;
      const boneMat = fact.materials.bone;
      const fleshMat = fact.materials.flesh;

      // Torso: Anatomical barrel chest with organic beveled shoulders
      const torsoGroup = new THREE.Group();
      const chestGeo = new THREE.CylinderGeometry(0.26 * s, 0.22 * s, 0.72 * s, 10);
      const chest = new THREE.Mesh(chestGeo, scrubsMat);
      chest.scale.set(1.15, 1.0, 0.75); // Flatter anatomical chest
      torsoGroup.add(chest);

      // Exposed broken ribcage protruding from ruptured scrub shirt
      for (let i = 0; i < 4; i++) {
        const rib = new THREE.Mesh(new THREE.TorusGeometry(0.18 * s, 0.02 * s, 6, 12, Math.PI * 0.85), boneMat);
        rib.rotation.x = Math.PI / 2;
        rib.rotation.y = (i % 2 === 0 ? 0.2 : -0.2);
        rib.position.set(0, (0.16 - i * 0.09) * s, 0.12 * s);
        torsoGroup.add(rib);
      }
      // Gory visceral cavity beneath ribs
      const goreCavity = new THREE.Mesh(new THREE.CylinderGeometry(0.14 * s, 0.12 * s, 0.32 * s, 8), fleshMat);
      goreCavity.position.set(0, 0.04 * s, 0.1 * s);
      torsoGroup.add(goreCavity);

      torsoGroup.position.y = 1.12 * s;
      group.add(torsoGroup);

      // Head: Sculpted cranium with hollow eye sockets and neck tendons
      const headGroup = new THREE.Group();
      const craniumGeo = new THREE.CylinderGeometry(0.14 * s, 0.12 * s, 0.28 * s, 10);
      const cranium = new THREE.Mesh(craniumGeo, skinMat);
      cranium.position.y = 0.08 * s;
      cranium.scale.set(1.0, 1.0, 1.15);
      cranium.name = 'head';
      headGroup.add(cranium);

      // Deep sunken eye sockets with emissive dilated Thanatos pupils
      const socketMat = new THREE.MeshBasicMaterial({ color: 0x140505 });
      const pupilMat = new THREE.MeshBasicMaterial({ color: 0xf4a261 });
      for (let side of [-0.07, 0.07]) {
        const socket = new THREE.Mesh(new THREE.SphereGeometry(0.045 * s, 8, 8), socketMat);
        socket.position.set(side * s, 0.1 * s, 0.14 * s);
        const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.025 * s, 8, 8), pupilMat);
        pupil.position.set(side * s, 0.1 * s, 0.17 * s);
        headGroup.add(socket, pupil);
      }

      // Articulated gaping lower jaw with bloody teeth
      const jaw = new THREE.Mesh(new THREE.CylinderGeometry(0.11 * s, 0.08 * s, 0.14 * s, 8), fleshMat);
      jaw.scale.set(1.0, 1.0, 1.2);
      jaw.position.set(0, -0.09 * s, 0.08 * s);
      jaw.rotation.x = 0.28;
      // Jagged teeth
      const teeth = new THREE.Mesh(new THREE.BoxGeometry(0.16 * s, 0.03 * s, 0.03 * s), boneMat);
      teeth.position.set(0, 0.06 * s, 0.08 * s);
      jaw.add(teeth);
      headGroup.add(jaw);

      headGroup.position.set(0, 1.68 * s, 0);
      group.add(headGroup);

      // Left Arm: Articulated upper arm + forearm + claw
      const armL = new THREE.Group();
      const upperL = new THREE.Mesh(new THREE.CylinderGeometry(0.065 * s, 0.06 * s, 0.38 * s, 8), scrubsMat);
      upperL.position.y = -0.19 * s;
      const lowerL = new THREE.Mesh(new THREE.CylinderGeometry(0.055 * s, 0.045 * s, 0.38 * s, 8), skinMat);
      lowerL.position.set(0, -0.52 * s, 0.08 * s);
      lowerL.rotation.x = -0.4;
      // Claws
      const clawL = new THREE.Mesh(new THREE.BoxGeometry(0.12 * s, 0.08 * s, 0.04 * s), boneMat);
      clawL.position.set(0, -0.2 * s, 0);
      lowerL.add(clawL);

      armL.add(upperL, lowerL);
      armL.position.set(-0.34 * s, 1.4 * s, 0);
      armL.rotation.x = -0.55;

      // Right Arm: Embedded scalpel blade protruding
      const armR = new THREE.Group();
      const upperR = new THREE.Mesh(new THREE.CylinderGeometry(0.065 * s, 0.06 * s, 0.38 * s, 8), scrubsMat);
      upperR.position.y = -0.19 * s;
      const lowerR = new THREE.Mesh(new THREE.CylinderGeometry(0.055 * s, 0.045 * s, 0.38 * s, 8), skinMat);
      lowerR.position.set(0, -0.52 * s, 0.08 * s);
      lowerR.rotation.x = -0.35;
      const scalpel = new THREE.Mesh(new THREE.BoxGeometry(0.015 * s, 0.22 * s, 0.04 * s), new THREE.MeshStandardMaterial({ color: 0xcccccc, metalness: 0.9, roughness: 0.2 }));
      scalpel.position.set(0, -0.22 * s, 0.06 * s);
      scalpel.rotation.x = 0.4;
      lowerR.add(scalpel);

      armR.add(upperR, lowerR);
      armR.position.set(0.34 * s, 1.4 * s, 0);
      armR.rotation.x = -0.65;

      group.add(armL, armR);

      // Legs: Torn scrub pants and decomposed feet
      const legL = new THREE.Group();
      const legMeshL = new THREE.Mesh(new THREE.CylinderGeometry(0.085 * s, 0.075 * s, 0.72 * s, 8), scrubsMat);
      legMeshL.position.y = -0.36 * s;
      const footL = new THREE.Mesh(new THREE.BoxGeometry(0.12 * s, 0.08 * s, 0.24 * s), skinMat);
      footL.position.set(0, -0.72 * s, 0.06 * s);
      legL.add(legMeshL, footL);
      legL.position.set(-0.16 * s, 0.76 * s, 0);

      const legR = new THREE.Group();
      const legMeshR = new THREE.Mesh(new THREE.CylinderGeometry(0.085 * s, 0.075 * s, 0.72 * s, 8), scrubsMat);
      legMeshR.position.y = -0.36 * s;
      const footR = new THREE.Mesh(new THREE.BoxGeometry(0.12 * s, 0.08 * s, 0.24 * s), skinMat);
      footR.position.set(0, -0.72 * s, 0.06 * s);
      legR.add(legMeshR, footR);
      legR.position.set(0.16 * s, 0.76 * s, 0);

      group.add(legL, legR);

      return { headGroup, headMesh: cranium, jawMesh: jaw, armL, armR, legL, legR };
    }

    /* ---------------- 2. TOXIC BIO-SPITTER ---------------- */
    static buildSpitter(group, fact, scale) {
      const s = scale;
      const skinMat = new THREE.MeshStandardMaterial({ color: 0x3d542e, roughness: 0.65 });
      const pustuleMat = fact.materials.bile;
      const fleshMat = fact.materials.flesh;
      const animatedParts = [];

      const torsoGroup = new THREE.Group();
      const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.22 * s, 0.18 * s, 0.7 * s, 8), skinMat);
      torso.scale.set(1.1, 1.0, 0.8);
      torsoGroup.add(torso);

      // Pulsing toxic boil clusters
      const pPositions = [
        { x: -0.16 * s, y: 0.22 * s, z: -0.16 * s, r: 0.11 * s },
        { x: 0.14 * s, y: 0.24 * s, z: -0.18 * s, r: 0.13 * s },
        { x: 0.0 * s, y: 0.06 * s, z: -0.18 * s, r: 0.14 * s },
        { x: -0.2 * s, y: 0.32 * s, z: 0.0 * s, r: 0.09 * s },
        { x: 0.2 * s, y: 0.32 * s, z: 0.0 * s, r: 0.1 * s }
      ];

      for (const p of pPositions) {
        const pustule = new THREE.Mesh(new THREE.SphereGeometry(p.r, 8, 8), pustuleMat);
        pustule.position.set(p.x, p.y, p.z);
        torsoGroup.add(pustule);
        animatedParts.push({ mesh: pustule, baseScale: pustule.scale.clone(), phase: Math.random() * Math.PI * 2 });
      }

      torsoGroup.position.set(0, 1.05 * s, 0.1 * s);
      torsoGroup.rotation.x = 0.32; // Hunched
      group.add(torsoGroup);

      // Split lower jaw
      const headGroup = new THREE.Group();
      const cranium = new THREE.Mesh(new THREE.CylinderGeometry(0.13 * s, 0.11 * s, 0.26 * s, 8), skinMat);
      cranium.position.y = 0.05 * s;
      cranium.name = 'head';
      headGroup.add(cranium);

      const jaw = new THREE.Mesh(new THREE.BoxGeometry(0.22 * s, 0.12 * s, 0.2 * s), fleshMat);
      jaw.position.set(0, -0.12 * s, 0.08 * s);
      jaw.rotation.x = 0.45;
      headGroup.add(jaw);

      const eyeMat = new THREE.MeshBasicMaterial({ color: 0x99ff22 });
      for (let side of [-0.07, 0.07]) {
        const eye = new THREE.Mesh(new THREE.SphereGeometry(0.035 * s, 8, 8), eyeMat);
        eye.position.set(side * s, 0.06 * s, 0.15 * s);
        headGroup.add(eye);
      }

      headGroup.position.set(0, 1.55 * s, 0.22 * s);
      group.add(headGroup);

      const armL = new THREE.Group();
      const armMeshL = new THREE.Mesh(new THREE.CylinderGeometry(0.06 * s, 0.05 * s, 0.75 * s, 8), skinMat);
      armMeshL.position.y = -0.36 * s;
      armL.add(armMeshL);
      armL.position.set(-0.28 * s, 1.25 * s, 0.1 * s);
      armL.rotation.x = -0.4;

      const armR = new THREE.Group();
      const armMeshR = new THREE.Mesh(new THREE.CylinderGeometry(0.06 * s, 0.05 * s, 0.75 * s, 8), skinMat);
      armMeshR.position.y = -0.36 * s;
      armR.add(armMeshR);
      armR.position.set(0.28 * s, 1.25 * s, 0.1 * s);
      armR.rotation.x = -0.4;
      group.add(armL, armR);

      const legL = new THREE.Group();
      const legMeshL = new THREE.Mesh(new THREE.CylinderGeometry(0.08 * s, 0.07 * s, 0.75 * s, 8), skinMat);
      legMeshL.position.y = -0.36 * s;
      legL.add(legMeshL);
      legL.position.set(-0.15 * s, 0.72 * s, 0);

      const legR = new THREE.Group();
      const legMeshR = new THREE.Mesh(new THREE.CylinderGeometry(0.08 * s, 0.07 * s, 0.75 * s, 8), skinMat);
      legMeshR.position.y = -0.36 * s;
      legR.add(legMeshR);
      legR.position.set(0.15 * s, 0.72 * s, 0);
      group.add(legL, legR);

      return { headGroup, headMesh: cranium, jawMesh: jaw, armL, armR, legL, legR, animatedParts };
    }

    /* ---------------- 3. ARMORED BRUTE ---------------- */
    static buildBrute(group, fact, scale) {
      const s = scale;
      const skinMat = new THREE.MeshStandardMaterial({ color: 0x3d4a3b, roughness: 0.8 });
      const armorMat = fact.materials.armor;
      const boneMat = fact.materials.bone;

      const torsoGroup = new THREE.Group();
      const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.38 * s, 0.32 * s, 0.85 * s, 10), armorMat);
      torso.scale.set(1.2, 1.0, 0.85);

      const pauldronL = new THREE.Mesh(new THREE.SphereGeometry(0.18 * s, 8, 8), armorMat);
      pauldronL.position.set(-0.46 * s, 0.38 * s, 0);
      const pauldronR = new THREE.Mesh(new THREE.SphereGeometry(0.18 * s, 8, 8), armorMat);
      pauldronR.position.set(0.46 * s, 0.38 * s, 0);
      torsoGroup.add(torso, pauldronL, pauldronR);
      torsoGroup.position.y = 1.15 * s;
      group.add(torsoGroup);

      const headGroup = new THREE.Group();
      const helmet = new THREE.Mesh(new THREE.SphereGeometry(0.22 * s, 10, 10), armorMat);
      helmet.name = 'head';
      const visor = new THREE.Mesh(new THREE.BoxGeometry(0.24 * s, 0.04 * s, 0.06 * s), new THREE.MeshBasicMaterial({ color: 0xe63946 }));
      visor.position.set(0, 0.02 * s, 0.2 * s);
      headGroup.add(helmet, visor);
      headGroup.position.set(0, 1.78 * s, 0);
      group.add(headGroup);

      // Spiked mutated left club arm
      const armL = new THREE.Group();
      const upperL = new THREE.Mesh(new THREE.CylinderGeometry(0.14 * s, 0.16 * s, 0.45 * s, 8), skinMat);
      upperL.position.y = -0.2 * s;
      const clubL = new THREE.Mesh(new THREE.SphereGeometry(0.24 * s, 8, 8), boneMat);
      clubL.position.set(0, -0.65 * s, 0.05 * s);
      for (let i = 0; i < 4; i++) {
        const spike = new THREE.Mesh(new THREE.ConeGeometry(0.05 * s, 0.22 * s, 6), boneMat);
        spike.rotation.x = Math.PI / 2;
        spike.position.set((i % 2 === 0 ? 0.15 : -0.15) * s, -0.55 * s - i * 0.08 * s, 0.2 * s);
        armL.add(spike);
      }
      armL.add(upperL, clubL);
      armL.position.set(-0.52 * s, 1.45 * s, 0);
      armL.rotation.x = -0.4;

      const armR = new THREE.Group();
      const armMeshR = new THREE.Mesh(new THREE.CylinderGeometry(0.11 * s, 0.1 * s, 0.85 * s, 8), armorMat);
      armMeshR.position.y = -0.42 * s;
      armR.add(armMeshR);
      armR.position.set(0.52 * s, 1.45 * s, 0);
      armR.rotation.x = -0.3;
      group.add(armL, armR);

      const legL = new THREE.Group();
      const legMeshL = new THREE.Mesh(new THREE.CylinderGeometry(0.14 * s, 0.12 * s, 0.8 * s, 8), armorMat);
      legMeshL.position.y = -0.4 * s;
      legL.add(legMeshL);
      legL.position.set(-0.24 * s, 0.75 * s, 0);

      const legR = new THREE.Group();
      const legMeshR = new THREE.Mesh(new THREE.CylinderGeometry(0.14 * s, 0.12 * s, 0.8 * s, 8), armorMat);
      legMeshR.position.y = -0.4 * s;
      legR.add(legMeshR);
      legR.position.set(0.24 * s, 0.75 * s, 0);
      group.add(legL, legR);

      return { headGroup, headMesh: helmet, armL, armR, legL, legR };
    }

    /* ---------------- 4. BLOODY CRAWLER ---------------- */
    static buildCrawler(group, fact, scale) {
      const s = scale;
      const skinMat = new THREE.MeshStandardMaterial({ color: 0x4d3232, roughness: 0.7 });
      const fleshMat = fact.materials.flesh;
      const boneMat = fact.materials.bone;

      const torsoGroup = new THREE.Group();
      const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.22 * s, 0.18 * s, 0.6 * s, 8), skinMat);
      torso.scale.set(1.1, 1.0, 0.8);
      torsoGroup.add(torso);

      // Severed vertebrae trailing
      for (let i = 0; i < 4; i++) {
        const vert = new THREE.Mesh(new THREE.CylinderGeometry(0.06 * s, 0.06 * s, 0.08 * s, 6), boneMat);
        vert.rotation.x = Math.PI / 2;
        vert.position.set(0, (-0.35 - i * 0.12) * s, 0);
        torsoGroup.add(vert);
      }
      const gutGore = new THREE.Mesh(new THREE.SphereGeometry(0.16 * s, 8, 8), fleshMat);
      gutGore.position.set(0, -0.48 * s, 0);
      torsoGroup.add(gutGore);

      torsoGroup.position.set(0, 0.32 * s, 0);
      torsoGroup.rotation.x = Math.PI / 2.3; // Low crawling
      group.add(torsoGroup);

      const headGroup = new THREE.Group();
      const cranium = new THREE.Mesh(new THREE.SphereGeometry(0.16 * s, 8, 8), skinMat);
      cranium.name = 'head';
      headGroup.add(cranium);

      const jaw = new THREE.Mesh(new THREE.BoxGeometry(0.18 * s, 0.08 * s, 0.16 * s), fleshMat);
      jaw.position.set(0, -0.1 * s, 0.08 * s);
      jaw.rotation.x = 0.35;
      headGroup.add(jaw);

      const eyeMat = new THREE.MeshBasicMaterial({ color: 0xe63946 });
      for (let side of [-0.07, 0.07]) {
        const eye = new THREE.Mesh(new THREE.SphereGeometry(0.035 * s, 8, 8), eyeMat);
        eye.position.set(side * s, 0.04 * s, 0.14 * s);
        headGroup.add(eye);
      }
      headGroup.position.set(0, 0.52 * s, 0.28 * s);
      group.add(headGroup);

      // Long dragging arms
      const armL = new THREE.Group();
      const armMeshL = new THREE.Mesh(new THREE.CylinderGeometry(0.065 * s, 0.05 * s, 0.82 * s, 8), skinMat);
      armMeshL.position.y = -0.4 * s;
      armL.add(armMeshL);
      armL.position.set(-0.32 * s, 0.35 * s, 0.15 * s);
      armL.rotation.x = -1.2;

      const armR = new THREE.Group();
      const armMeshR = new THREE.Mesh(new THREE.CylinderGeometry(0.065 * s, 0.05 * s, 0.82 * s, 8), skinMat);
      armMeshR.position.y = -0.4 * s;
      armR.add(armMeshR);
      armR.position.set(0.32 * s, 0.35 * s, 0.15 * s);
      armR.rotation.x = -1.2;
      group.add(armL, armR);

      return { headGroup, headMesh: cranium, jawMesh: jaw, armL, armR };
    }

    /* ---------------- 5. SUBJECT ZERO (BOSS) ---------------- */
    static buildBoss(group, fact, scale) {
      const s = scale;
      const skinMat = new THREE.MeshStandardMaterial({ color: 0x5a1414, roughness: 0.6, metalness: 0.1 });
      const steelMat = new THREE.MeshStandardMaterial({ color: 0x44484a, metalness: 0.85, roughness: 0.3 });
      const coreMat = new THREE.MeshBasicMaterial({ color: 0xff1133 });
      const animatedParts = [];

      const torsoGroup = new THREE.Group();
      const torso = new THREE.Mesh(new THREE.CylinderGeometry(0.45 * s, 0.38 * s, 1.1 * s, 10), skinMat);
      torso.scale.set(1.2, 1.0, 0.85);
      torsoGroup.add(torso);

      const coreLight = new THREE.Mesh(new THREE.SphereGeometry(0.18 * s, 12, 12), coreMat);
      coreLight.position.set(0, 0.22 * s, 0.28 * s);
      torsoGroup.add(coreLight);
      animatedParts.push({ mesh: coreLight, baseScale: coreLight.scale.clone(), phase: 0 });

      const collar = new THREE.Mesh(new THREE.TorusGeometry(0.34 * s, 0.06 * s, 8, 14), steelMat);
      collar.rotation.x = Math.PI / 2;
      collar.position.y = 0.52 * s;
      torsoGroup.add(collar);

      torsoGroup.position.y = 1.45 * s;
      group.add(torsoGroup);

      const headGroup = new THREE.Group();
      const cranium = new THREE.Mesh(new THREE.SphereGeometry(0.28 * s, 10, 10), skinMat);
      cranium.name = 'head';
      headGroup.add(cranium);

      for (let i = 0; i < 6; i++) {
        const eye = new THREE.Mesh(new THREE.SphereGeometry(0.04 * s, 8, 8), coreMat);
        const ex = (i % 2 === 0 ? -0.12 : 0.12) * s;
        const ey = (0.02 + Math.floor(i / 2) * 0.08) * s;
        eye.position.set(ex, ey, 0.24 * s);
        headGroup.add(eye);
      }
      headGroup.position.set(0, 2.25 * s, 0);
      group.add(headGroup);

      const armL = new THREE.Group();
      const armMeshL = new THREE.Mesh(new THREE.CylinderGeometry(0.16 * s, 0.14 * s, 1.2 * s, 8), skinMat);
      armMeshL.position.y = -0.6 * s;
      const cuffL = new THREE.Mesh(new THREE.TorusGeometry(0.18 * s, 0.04 * s, 6, 10), steelMat);
      cuffL.position.set(0, -0.9 * s, 0);
      cuffL.rotation.x = Math.PI / 2;
      armL.add(armMeshL, cuffL);
      armL.position.set(-0.65 * s, 1.85 * s, 0);
      armL.rotation.x = -0.5;

      const armR = new THREE.Group();
      const armMeshR = new THREE.Mesh(new THREE.CylinderGeometry(0.16 * s, 0.14 * s, 1.2 * s, 8), skinMat);
      armMeshR.position.y = -0.6 * s;
      const cuffR = new THREE.Mesh(new THREE.TorusGeometry(0.18 * s, 0.04 * s, 6, 10), steelMat);
      cuffR.position.set(0, -0.9 * s, 0);
      cuffR.rotation.x = Math.PI / 2;
      armR.add(armMeshR, cuffR);
      armR.position.set(0.65 * s, 1.85 * s, 0);
      armR.rotation.x = -0.5;
      group.add(armL, armR);

      const legL = new THREE.Group();
      const legMeshL = new THREE.Mesh(new THREE.CylinderGeometry(0.18 * s, 0.15 * s, 1.05 * s, 8), skinMat);
      legMeshL.position.y = -0.52 * s;
      legL.add(legMeshL);
      legL.position.set(-0.3 * s, 0.95 * s, 0);

      const legR = new THREE.Group();
      const legMeshR = new THREE.Mesh(new THREE.CylinderGeometry(0.18 * s, 0.15 * s, 1.05 * s, 8), skinMat);
      legMeshR.position.y = -0.52 * s;
      legR.add(legMeshR);
      legR.position.set(0.3 * s, 0.95 * s, 0);
      group.add(legL, legR);

      return { headGroup, headMesh: cranium, armL, armR, legL, legR, animatedParts };
    }
  }

  // Export
  window.ZombieModelBuilder = RealisticZombieBuilder;
})(window);
