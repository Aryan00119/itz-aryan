/**
 * ST. AGNES MERCY: FLATLINE PROTOCOL 3D
 * Hyper-Realistic Tactical Fluid Blood & Splatter System
 * Authentic Coagulated Blood Tones, Directional Splatters & Zero Floating Sprites
 */

(function (window) {
  'use strict';

  class RealisticBloodSystem {
    constructor(scene) {
      this.scene = scene;
      this.particles = [];
      this.decals = [];
      this.maxDecals = 45;
      this.sharedPlaneGeo = new THREE.PlaneGeometry(1, 1);
      this.initFluidTextures();
    }

    createCanvas(w = 256, h = 256) {
      const c = document.createElement('canvas');
      c.width = w; c.height = h;
      return c;
    }

    initFluidTextures() {
      // 1. Soft Micro-Droplet Particle (Dark rich crimson mist)
      const cDrop = this.createCanvas(64, 64);
      const ctxDrop = cDrop.getContext('2d');
      const gradDrop = ctxDrop.createRadialGradient(32, 32, 2, 32, 32, 28);
      gradDrop.addColorStop(0, 'rgba(42, 4, 4, 0.95)');
      gradDrop.addColorStop(0.4, 'rgba(65, 7, 7, 0.85)');
      gradDrop.addColorStop(0.75, 'rgba(40, 4, 4, 0.45)');
      gradDrop.addColorStop(1, 'rgba(20, 2, 2, 0)');
      ctxDrop.fillStyle = gradDrop;
      ctxDrop.beginPath();
      ctxDrop.arc(32, 32, 28, 0, Math.PI * 2);
      ctxDrop.fill();
      this.texDroplet = new THREE.CanvasTexture(cDrop);

      // 2. High-Velocity Organic Splatters (4 procedural variations - NO fake concentric rings!)
      this.floorTextures = [];

      // Variation A: Organic Main Pool with Natural Radiating Spatter
      {
        const c = this.createCanvas(256, 256);
        const ctx = c.getContext('2d');
        this.renderSplatterPool(ctx, 128, 128, 48, 18, 0.55);
        this.renderSatelliteDrips(ctx, 128, 128, 38, 75, 24);
        this.floorTextures.push(new THREE.CanvasTexture(c));
      }

      // Variation B: Directional High-Velocity Spray (Elongated tear streaks)
      {
        const c = this.createCanvas(256, 256);
        const ctx = c.getContext('2d');
        this.renderDirectionalSpray(ctx, 128, 128, 55, 32);
        this.floorTextures.push(new THREE.CanvasTexture(c));
      }

      // Variation C: Heavy Coagulated Visceral Mass (Dark irregular clot)
      {
        const c = this.createCanvas(256, 256);
        const ctx = c.getContext('2d');
        this.renderCoagulatedMass(ctx, 128, 128, 52);
        this.floorTextures.push(new THREE.CanvasTexture(c));
      }

      // Variation D: Scattered Arterial Spatter Pattern (Micro droplets & streak cluster)
      {
        const c = this.createCanvas(256, 256);
        const ctx = c.getContext('2d');
        this.renderSpatterCluster(ctx, 128, 128, 60);
        this.floorTextures.push(new THREE.CanvasTexture(c));
      }

      // 3. Wall Splatter & Drip Texture (Dark coagulated gravity drips)
      const cWall = this.createCanvas(256, 256);
      const ctxWall = cWall.getContext('2d');
      // Impact blot
      this.drawOrganicShape(ctxWall, 128, 65, 36, 16, 0.45, '#1e0202');
      this.drawOrganicShape(ctxWall, 128, 65, 24, 12, 0.3, '#320404');
      // Running drips with downward gravity taper
      const dripX = [105, 118, 128, 138, 150];
      for (let i = 0; i < dripX.length; i++) {
        const x = dripX[i] + (Math.random() - 0.5) * 6;
        const len = 40 + Math.random() * 85;
        ctxWall.strokeStyle = '#180202';
        ctxWall.lineWidth = 2.5 + Math.random() * 1.8;
        ctxWall.lineCap = 'round';
        ctxWall.beginPath();
        ctxWall.moveTo(x, 75);
        ctxWall.bezierCurveTo(
          x + (Math.random() - 0.5) * 4, 75 + len * 0.4,
          x + (Math.random() - 0.5) * 6, 75 + len * 0.7,
          x + (Math.random() - 0.5) * 3, 75 + len
        );
        ctxWall.stroke();

        // Droplet at drip terminus
        ctxWall.fillStyle = '#2b0303';
        ctxWall.beginPath();
        ctxWall.arc(x, 75 + len, 2.2 + Math.random() * 1.5, 0, Math.PI * 2);
        ctxWall.fill();
      }
      this.texWallDrip = new THREE.CanvasTexture(cWall);

      // 4. Bloody Handprint Texture (Horror environmental decal)
      const cHand = this.createCanvas(256, 256);
      const ctxHand = cHand.getContext('2d');
      ctxHand.fillStyle = '#280303';
      ctxHand.beginPath();
      ctxHand.ellipse(128, 140, 26, 32, 0, 0, Math.PI * 2);
      ctxHand.fill();
      const fingers = [
        { x: -26, y: -22, len: 36, w: 6.5, rot: -0.38 },
        { x: -10, y: -34, len: 48, w: 7.2, rot: -0.1 },
        { x: 7, y: -38, len: 52, w: 7.2, rot: 0.05 },
        { x: 23, y: -32, len: 45, w: 6.8, rot: 0.22 },
        { x: 36, y: -16, len: 32, w: 6.2, rot: 0.52 }
      ];
      for (const f of fingers) {
        ctxHand.save();
        ctxHand.translate(128 + f.x, 140 + f.y);
        ctxHand.rotate(f.rot);
        ctxHand.fillRect(-f.w / 2, -f.len, f.w, f.len);
        ctxHand.beginPath();
        ctxHand.arc(0, -f.len, f.w / 2, 0, Math.PI * 2);
        ctxHand.fill();
        ctxHand.restore();
      }
      this.texHandprint = new THREE.CanvasTexture(cHand);

      // Wet glossy materials (low roughness for wet liquid sheen)
      this.floorMaterials = this.floorTextures.map(tex => new THREE.MeshStandardMaterial({
        map: tex,
        transparent: true,
        opacity: 0.95,
        roughness: 0.12,
        metalness: 0.15,
        depthWrite: false,
        polygonOffset: true,
        polygonOffsetFactor: -1.5,
        polygonOffsetUnits: -3.0
      }));

      this.wallDripMaterial = new THREE.MeshStandardMaterial({
        map: this.texWallDrip,
        transparent: true,
        opacity: 0.92,
        roughness: 0.12,
        metalness: 0.15,
        depthWrite: false,
        polygonOffset: true,
        polygonOffsetFactor: -1.5
      });

      this.handprintMaterial = new THREE.MeshStandardMaterial({
        map: this.texHandprint,
        transparent: true,
        opacity: 0.88,
        roughness: 0.15,
        metalness: 0.1,
        depthWrite: false,
        polygonOffset: true,
        polygonOffsetFactor: -1.5
      });

      // Sprite material for flying blood mist
      this.spriteMatDroplet = new THREE.SpriteMaterial({
        map: this.texDroplet,
        transparent: true,
        opacity: 0.9,
        depthWrite: false,
        blending: THREE.NormalBlending
      });
    }

    /* ---------------- PROCEDURAL PROCEDURES FOR ORGANIC GORE ---------------- */
    drawOrganicShape(ctx, cx, cy, radius, points = 22, irregularity = 0.5, color = '#1a0202') {
      ctx.fillStyle = color;
      ctx.beginPath();
      const step = (Math.PI * 2) / points;
      for (let i = 0; i <= points; i++) {
        const a = i * step;
        const r = radius * (1 + (Math.random() - 0.5) * irregularity);
        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();
    }

    renderSplatterPool(ctx, cx, cy, baseR, points, irreg) {
      // Deep coagulated outer pool
      const grad = ctx.createRadialGradient(cx, cy, 4, cx, cy, baseR * 1.25);
      grad.addColorStop(0, '#0c0101');
      grad.addColorStop(0.45, '#1e0202');
      grad.addColorStop(0.85, '#350505');
      grad.addColorStop(0.98, '#4e0808');
      grad.addColorStop(1.0, 'rgba(55, 6, 6, 0)');
      ctx.fillStyle = grad;
      ctx.beginPath();
      const step = (Math.PI * 2) / points;
      for (let i = 0; i <= points; i++) {
        const a = i * step;
        const r = baseR * (1 + (Math.random() - 0.5) * irreg);
        const x = cx + Math.cos(a) * r;
        const y = cy + Math.sin(a) * r;
        if (i === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.fill();

      // Dark coagulated dense core
      this.drawOrganicShape(ctx, cx, cy, baseR * 0.55, 14, 0.35, '#120101');
    }

    renderSatelliteDrips(ctx, cx, cy, minD, maxD, count) {
      // Natural asymmetric droplet clusters (NOT a uniform circle!)
      ctx.fillStyle = '#2f0404';
      for (let i = 0; i < count; i++) {
        // Bias droplets toward 2-3 random splatter branches
        const mainAngle = (i % 3) * (Math.PI * 0.65) + (Math.random() - 0.5) * 0.9;
        const dist = minD + Math.random() * (maxD - minD);
        const r = 1.0 + Math.random() * 3.2;
        const px = cx + Math.cos(mainAngle) * dist;
        const py = cy + Math.sin(mainAngle) * dist;

        ctx.beginPath();
        ctx.arc(px, py, r, 0, Math.PI * 2);
        ctx.fill();

        // Occasional micro streak from droplet
        if (Math.random() < 0.4) {
          ctx.strokeStyle = '#260303';
          ctx.lineWidth = r * 0.6;
          ctx.beginPath();
          ctx.moveTo(px, py);
          ctx.lineTo(px + Math.cos(mainAngle) * (r * 3), py + Math.sin(mainAngle) * (r * 3));
          ctx.stroke();
        }
      }
    }

    renderDirectionalSpray(ctx, cx, cy, length, numStreaks) {
      const sprayAngle = Math.random() * Math.PI * 2;
      ctx.fillStyle = '#1e0202';
      // Dense center splash
      this.drawOrganicShape(ctx, cx, cy, 26, 14, 0.45, '#180202');

      // Radiating velocity streaks along the cone
      for (let i = 0; i < numStreaks; i++) {
        const spread = (Math.random() - 0.5) * 1.1;
        const a = sprayAngle + spread;
        const len = length * (0.4 + Math.random() * 0.9);
        const sx = cx + (Math.random() - 0.5) * 16;
        const sy = cy + (Math.random() - 0.5) * 16;
        const ex = sx + Math.cos(a) * len;
        const ey = sy + Math.sin(a) * len;

        ctx.strokeStyle = Math.random() < 0.5 ? '#280404' : '#1c0202';
        ctx.lineWidth = 1.2 + Math.random() * 2.8;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(ex, ey);
        ctx.stroke();

        // Droplet at tip
        ctx.fillStyle = '#380505';
        ctx.beginPath();
        ctx.arc(ex, ey, 1.2 + Math.random() * 2.0, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    renderCoagulatedMass(ctx, cx, cy, radius) {
      // Heavy dark visceral clot
      const grad = ctx.createRadialGradient(cx, cy, 2, cx, cy, radius);
      grad.addColorStop(0, '#0a0101');
      grad.addColorStop(0.5, '#160202');
      grad.addColorStop(0.85, '#290303');
      grad.addColorStop(1.0, 'rgba(40, 4, 4, 0)');
      ctx.fillStyle = grad;
      this.drawOrganicShape(ctx, cx, cy, radius, 20, 0.4, grad);
      this.drawOrganicShape(ctx, cx + 12, cy - 8, radius * 0.45, 12, 0.5, '#0c0101');
      this.drawOrganicShape(ctx, cx - 14, cy + 10, radius * 0.4, 12, 0.4, '#120202');

      // Secondary fine droplets around mass
      ctx.fillStyle = '#260303';
      for (let i = 0; i < 22; i++) {
        const a = Math.random() * Math.PI * 2;
        const d = radius * (0.8 + Math.random() * 0.5);
        ctx.beginPath();
        ctx.arc(cx + Math.cos(a) * d, cy + Math.sin(a) * d, 1.2 + Math.random() * 2.2, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    renderSpatterCluster(ctx, cx, cy, radius) {
      // Cluster of varied micro droplets (Shotgun or rapid hit impact)
      ctx.fillStyle = '#1c0202';
      for (let i = 0; i < 48; i++) {
        const a = Math.random() * Math.PI * 2;
        const d = Math.pow(Math.random(), 1.8) * radius;
        const r = 1.0 + Math.random() * 3.4;
        ctx.beginPath();
        ctx.arc(cx + Math.cos(a) * d, cy + Math.sin(a) * d, r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    /* ---------------- SPAWN FLUID BLOOD IMPACT ---------------- */
    spawnImpact(pos, normal, isCrit = false, count = 10, isWall = false) {
      const dropCount = Math.min(isCrit ? 16 : 10, count);

      // Fast-moving small liquid droplets
      for (let i = 0; i < dropCount; i++) {
        const sprite = new THREE.Sprite(this.spriteMatDroplet);
        const sz = 0.05 + Math.random() * (isCrit ? 0.08 : 0.05);
        sprite.scale.set(sz, sz, 1);
        sprite.position.copy(pos);

        // Velocity biased along hit normal or outward fan
        const vel = new THREE.Vector3(
          (Math.random() - 0.5) * 3.8,
          Math.random() * 2.4 + 0.8,
          (Math.random() - 0.5) * 3.8
        );
        if (normal) {
          vel.add(normal.clone().multiplyScalar(2.6));
        }

        this.scene.add(sprite);
        this.particles.push({
          sprite,
          vel,
          initialScale: sz,
          life: 0.28 + Math.random() * 0.12,
          maxLife: 0.4
        });
      }

      // Spawn Surface Decal (Floor splatter beneath target, only spawn wall decal if isWall is explicitly true)
      if (isWall && normal) {
        const type = Math.random() < 0.2 ? 'handprint' : 'wall_drip';
        this.spawnWallDecal(pos, normal, isCrit ? 0.75 : 0.55, type);
      } else {
        // Floor Hit (Realistic compact size: 0.42m - 0.65m beneath the body)
        this.spawnFloorDecal(pos.x, pos.z, isCrit ? 0.65 : 0.42);
      }
    }

    spawnFloorDecal(x, z, size = 0.5) {
      if (this.decals.length >= this.maxDecals) {
        const old = this.decals.shift();
        this.scene.remove(old);
        if (old.geometry && old.geometry !== this.sharedPlaneGeo) old.geometry.dispose();
      }

      const matIdx = Math.floor(Math.random() * this.floorMaterials.length);
      const mat = this.floorMaterials[matIdx];
      const s = size * (0.85 + Math.random() * 0.3);
      const mesh = new THREE.Mesh(this.sharedPlaneGeo, mat);
      mesh.scale.set(s, s, 1);

      mesh.rotation.x = -Math.PI / 2;
      mesh.rotation.z = Math.random() * Math.PI * 2;
      mesh.position.set(x, 0.016 + (this.decals.length % 15) * 0.0008, z);
      mesh.receiveShadow = false; // Floor decals don't need expensive shadow map matrix recalculations

      this.scene.add(mesh);
      this.decals.push(mesh);
      return mesh;
    }

    spawnWallDecal(pos, normal, size = 0.6, type = 'wall_drip') {
      if (this.decals.length >= this.maxDecals) {
        const old = this.decals.shift();
        this.scene.remove(old);
        if (old.geometry && old.geometry !== this.sharedPlaneGeo) old.geometry.dispose();
      }

      const mat = (type === 'handprint') ? this.handprintMaterial : this.wallDripMaterial;
      const s = size * (0.85 + Math.random() * 0.3);
      const mesh = new THREE.Mesh(this.sharedPlaneGeo, mat);
      mesh.scale.set(s, s, 1);

      mesh.position.set(
        pos.x + normal.x * 0.015,
        pos.y + normal.y * 0.015,
        pos.z + normal.z * 0.015
      );
      mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), normal);
      mesh.receiveShadow = false;

      this.scene.add(mesh);
      this.decals.push(mesh);
      return mesh;
    }

    update(dt) {
      // Update flying fluid droplets with swift gravity and immediate ground contact
      for (let i = this.particles.length - 1; i >= 0; i--) {
        const p = this.particles[i];
        p.life -= dt;
        p.vel.y -= 14.0 * dt; // Strong natural gravity
        p.vel.x *= 0.96;
        p.vel.z *= 0.96;

        p.sprite.position.addScaledVector(p.vel, dt);

        // Smooth quick fade out
        const lifeRatio = p.life / p.maxLife;
        p.sprite.material.opacity = Math.max(0, lifeRatio * 0.9);

        // Floor contact: Instantly disappear upon touching floor! (Zero floating vertical streaks)
        if (p.sprite.position.y <= 0.035) {
          // Small chance of tiny micro-splat on impact
          if (Math.random() < 0.15 && this.decals.length < this.maxDecals) {
            this.spawnFloorDecal(p.sprite.position.x, p.sprite.position.z, 0.28);
          }
          p.life = 0; // Terminate immediately
        }

        if (p.life <= 0) {
          this.scene.remove(p.sprite);
          this.particles.splice(i, 1);
        }
      }
    }

    clear() {
      for (const d of this.decals) {
        this.scene.remove(d);
        if (d.geometry && d.geometry !== this.sharedPlaneGeo) d.geometry.dispose();
      }
      this.decals = [];

      for (const p of this.particles) {
        this.scene.remove(p.sprite);
      }
      this.particles = [];
    }
  }

  // Export
  window.BloodSystem = RealisticBloodSystem;
})(window);
