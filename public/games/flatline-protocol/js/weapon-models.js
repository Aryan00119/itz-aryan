/**
 * ST. AGNES MERCY: FLATLINE PROTOCOL 3D
 * Next-Gen Tactical 3D Weapon Models & True Two-Handed First-Person Rig
 * Features: Realistic Operator Sleeves & Combat Gloves, Functional EOTech Sight,
 * Dynamic Two-Handed Weapon Grips, and Authentic Gunmetal Finishes.
 */

(function (window) {
  'use strict';

  class WeaponModelBuilder {
    constructor() {
      this.initMaterials();
    }

    initMaterials() {
      // 1. Procedural Tactical Ripstop Sleeve Fabric
      const sleeveCanvas = document.createElement('canvas');
      sleeveCanvas.width = 256; sleeveCanvas.height = 256;
      const sctx = sleeveCanvas.getContext('2d');
      sctx.fillStyle = '#1e2328';
      sctx.fillRect(0, 0, 256, 256);
      // Ripstop tactical grid weave
      sctx.strokeStyle = '#282f36';
      sctx.lineWidth = 1;
      for (let x = 0; x <= 256; x += 16) {
        sctx.beginPath(); sctx.moveTo(x, 0); sctx.lineTo(x, 256); sctx.stroke();
      }
      for (let y = 0; y <= 256; y += 16) {
        sctx.beginPath(); sctx.moveTo(0, y); sctx.lineTo(256, y); sctx.stroke();
      }
      // Fabric noise
      for (let i = 0; i < 4000; i++) {
        const x = Math.random() * 256;
        const y = Math.random() * 256;
        sctx.fillStyle = Math.random() > 0.5 ? 'rgba(38,45,52,0.45)' : 'rgba(20,24,28,0.45)';
        sctx.fillRect(x, y, 2, 2);
      }
      const sleeveTex = new THREE.CanvasTexture(sleeveCanvas);

      // 2. Procedural Combat Glove Leather & Kevlar Grip Texture
      const gloveCanvas = document.createElement('canvas');
      gloveCanvas.width = 128; gloveCanvas.height = 128;
      const gctx = gloveCanvas.getContext('2d');
      gctx.fillStyle = '#14171a';
      gctx.fillRect(0, 0, 128, 128);
      gctx.fillStyle = '#22282e';
      for (let x = 0; x < 128; x += 6) {
        for (let y = 0; y < 128; y += 6) {
          if ((x + y) % 12 === 0) gctx.fillRect(x, y, 3, 3);
        }
      }
      const gloveTex = new THREE.CanvasTexture(gloveCanvas);

      // 3. Stamped Gunmetal Texture (Brushed tactical steel with subtle highlights)
      const gunMetalCanvas = document.createElement('canvas');
      gunMetalCanvas.width = 256; gunMetalCanvas.height = 256;
      const gmctx = gunMetalCanvas.getContext('2d');
      gmctx.fillStyle = '#2c3136';
      gmctx.fillRect(0, 0, 256, 256);
      for (let i = 0; i < 5000; i++) {
        const x = Math.random() * 256;
        const y = Math.random() * 256;
        const b = 38 + Math.random() * 24;
        gmctx.fillStyle = `rgb(${b},${b + 2},${b + 4})`;
        gmctx.fillRect(x, y, Math.random() * 5 + 1, 1);
      }
      const gunMetalTex = new THREE.CanvasTexture(gunMetalCanvas);

      // 4. Tactical Checkered Polymer Grip Texture
      const polyCanvas = document.createElement('canvas');
      polyCanvas.width = 128; polyCanvas.height = 128;
      const pctx = polyCanvas.getContext('2d');
      pctx.fillStyle = '#1b1f22';
      pctx.fillRect(0, 0, 128, 128);
      pctx.fillStyle = '#292e34';
      for (let x = 0; x < 128; x += 8) {
        for (let y = 0; y < 128; y += 8) {
          if ((x + y) % 16 === 0) pctx.fillRect(x, y, 5, 5);
        }
      }
      const polyTex = new THREE.CanvasTexture(polyCanvas);

      // Materials Palette
      this.mats = {
        gunSteel: new THREE.MeshStandardMaterial({
          map: gunMetalTex,
          color: 0x545e68,
          metalness: 0.55,
          roughness: 0.35
        }),
        darkParkerized: new THREE.MeshStandardMaterial({
          color: 0x32383f,
          metalness: 0.45,
          roughness: 0.48
        }),
        chromeSteel: new THREE.MeshStandardMaterial({
          color: 0xe2e8ef,
          metalness: 0.95,
          roughness: 0.15
        }),
        mattePolymer: new THREE.MeshStandardMaterial({
          map: polyTex,
          color: 0x353c44,
          roughness: 0.65,
          metalness: 0.15
        }),
        checkeredWood: new THREE.MeshStandardMaterial({
          color: 0x5a371e,
          roughness: 0.55,
          metalness: 0.05
        }),
        brassMetal: new THREE.MeshStandardMaterial({
          color: 0xd4af37,
          metalness: 0.95,
          roughness: 0.2
        }),
        shellRed: new THREE.MeshStandardMaterial({
          color: 0xc42020,
          roughness: 0.4,
          metalness: 0.1
        }),
        // Holographic Optic Glasses & Reticles
        holoLens: new THREE.MeshBasicMaterial({
          color: 0x48cae4,
          transparent: true,
          opacity: 0.12,
          side: THREE.DoubleSide
        }),
        holoReticle: new THREE.MeshBasicMaterial({
          color: 0xff1e27,
          transparent: true,
          opacity: 0.96,
          side: THREE.DoubleSide,
          depthWrite: false
        }),
        tritiumDot: new THREE.MeshBasicMaterial({
          color: 0x52f28b
        }),
        flamePilot: new THREE.MeshBasicMaterial({
          color: 0x48cae4
        }),

        // Operator Gear Materials
        sleeve: new THREE.MeshStandardMaterial({
          map: sleeveTex,
          color: 0x343c44,
          roughness: 0.85,
          metalness: 0.05
        }),
        sleeveCuff: new THREE.MeshStandardMaterial({
          color: 0x20252a,
          roughness: 0.9,
          metalness: 0.02
        }),
        gloveBase: new THREE.MeshStandardMaterial({
          map: gloveTex,
          color: 0x242a30,
          roughness: 0.65,
          metalness: 0.15
        }),
        knuckleArmor: new THREE.MeshStandardMaterial({
          color: 0x111417,
          roughness: 0.28,
          metalness: 0.45
        }),
        skinTone: new THREE.MeshStandardMaterial({
          color: 0xc8987b,
          roughness: 0.68,
          metalness: 0.0
        }),
        wristWatch: new THREE.MeshStandardMaterial({
          color: 0x14181c,
          metalness: 0.85,
          roughness: 0.25
        }),
        watchScreen: new THREE.MeshBasicMaterial({
          color: 0x52f28b
        })
      };
    }

    /**
     * Helper: Creates a tapered arm segment between two 3D points
     * Guaranteed to stay in front of camera without clipping plane intersections.
     */
    createBoneMesh(pStart, pEnd, rStart, rEnd, material) {
      const vStart = new THREE.Vector3(pStart.x, pStart.y, pStart.z);
      const vEnd = new THREE.Vector3(pEnd.x, pEnd.y, pEnd.z);
      const dir = new THREE.Vector3().subVectors(vEnd, vStart);
      const len = dir.length();
      const geo = new THREE.CylinderGeometry(rEnd, rStart, len, 14);
      geo.translate(0, len * 0.5, 0);
      const mesh = new THREE.Mesh(geo, material);
      mesh.position.copy(vStart);
      mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.clone().normalize());
      return mesh;
    }

    /**
     * Creates natural, professionally positioned FPS two-handed tactical arms.
     */
    createHandsRig(weaponType) {
      const rig = new THREE.Group();
      rig.name = 'fpsHandsRig';
      const m = this.mats;

      // ========================================================
      // 1. RIGHT ARM & TRIGGER HAND
      // ========================================================
      const rGroup = new THREE.Group();

      // Right forearm enters at a natural diagonal from bottom right of screen
      const rBase = { x: 0.28, y: -0.32, z: 0.22 };
      const rWrist = { x: 0.016, y: -0.12, z: 0.08 };

      // Sleeve with cloth folds
      const rArm = this.createBoneMesh(rBase, rWrist, 0.052, 0.038, m.sleeve);
      rGroup.add(rArm);

      // Ribbed wrist cuff
      const rCuff = new THREE.Mesh(new THREE.CylinderGeometry(0.040, 0.042, 0.038, 12), m.sleeveCuff);
      rCuff.position.set(rWrist.x, rWrist.y - 0.005, rWrist.z);
      rCuff.rotation.set(-0.65, 0.22, -0.28);
      rGroup.add(rCuff);

      // Glove Palm wrapped around pistol grip
      const rPalm = new THREE.Mesh(new THREE.BoxGeometry(0.046, 0.062, 0.058), m.gloveBase);
      rPalm.position.set(0.008, -0.088, 0.075);
      rPalm.rotation.set(0.26, 0.04, -0.05);
      rGroup.add(rPalm);

      // Molded Carbon Knuckle Armor plate
      const rKnuckles = new THREE.Mesh(new THREE.BoxGeometry(0.044, 0.016, 0.026), m.knuckleArmor);
      rKnuckles.position.set(0.024, -0.076, 0.088);
      rKnuckles.rotation.set(0.26, 0.04, -0.05);
      rGroup.add(rKnuckles);

      // Thumb wrapped around left side of the handle
      const rThumb = new THREE.Mesh(new THREE.CylinderGeometry(0.008, 0.0095, 0.052, 8), m.gloveBase);
      rThumb.position.set(-0.020, -0.068, 0.065);
      rThumb.rotation.set(0.35, 0.35, 0.85);
      rGroup.add(rThumb);

      // Trigger finger extended along trigger guard
      const rTriggerFinger = new THREE.Mesh(new THREE.CylinderGeometry(0.0065, 0.008, 0.048, 8), m.gloveBase);
      rTriggerFinger.position.set(-0.010, -0.046, 0.018);
      rTriggerFinger.rotation.set(1.35, 0.02, 0.10);
      rGroup.add(rTriggerFinger);

      // Grip fingers (Middle, Ring, Pinky) curling around the handle
      for (let i = 0; i < 3; i++) {
        const finger = new THREE.Mesh(new THREE.CylinderGeometry(0.007, 0.0085, 0.042, 8), m.gloveBase);
        finger.position.set(-0.012, -0.080 - i * 0.019, 0.046 - i * 0.005);
        finger.rotation.set(0.28, 0, 1.45);
        const pad = new THREE.Mesh(new THREE.BoxGeometry(0.006, 0.009, 0.012), m.knuckleArmor);
        pad.position.set(-0.020, -0.080 - i * 0.019, 0.046 - i * 0.005);
        rGroup.add(finger, pad);
      }
      rig.add(rGroup);

      // ========================================================
      // 2. LEFT ARM & SUPPORT HAND
      // ========================================================
      const lGroup = new THREE.Group();

      if (weaponType === 'pistol' || weaponType === 'magnum') {
        // --- TWO-HANDED TACTICAL WEAVER / THUMBS-FORWARD GRIP ---
        const lBase = { x: -0.22, y: -0.42, z: 0.18 };
        const lWrist = { x: -0.038, y: -0.15, z: 0.09 };

        const lArm = this.createBoneMesh(lBase, lWrist, 0.052, 0.038, m.sleeve);
        lGroup.add(lArm);

        // Tactical Smartwatch on left wrist
        const lWatch = new THREE.Mesh(new THREE.BoxGeometry(0.034, 0.012, 0.036), m.wristWatch);
        lWatch.position.set(lWrist.x - 0.01, lWrist.y + 0.015, lWrist.z);
        lWatch.rotation.set(-0.55, -0.22, 0.35);
        const lWatchFace = new THREE.Mesh(new THREE.PlaneGeometry(0.022, 0.024), m.watchScreen);
        lWatchFace.position.set(0, 0.007, 0);
        lWatchFace.rotation.x = -Math.PI / 2;
        lWatch.add(lWatchFace);
        lGroup.add(lWatch);

        // Left palm cradling under right hand
        const lPalm = new THREE.Mesh(new THREE.BoxGeometry(0.048, 0.055, 0.058), m.gloveBase);
        lPalm.position.set(-0.014, -0.098, 0.068);
        lPalm.rotation.set(0.35, 0.15, 0.16);
        lGroup.add(lPalm);

        // Left knuckles & fingers wrapped over right fingers
        for (let i = 0; i < 3; i++) {
          const lFinger = new THREE.Mesh(new THREE.CylinderGeometry(0.007, 0.008, 0.044, 8), m.gloveBase);
          lFinger.position.set(0.004, -0.092 - i * 0.018, 0.044);
          lFinger.rotation.set(0.35, 0, -1.35);
          lGroup.add(lFinger);
        }
      } else {
        // --- TWO-HANDED RIFLE / SHOTGUN / FLAMER SUPPORT ---
        let fZ = -0.22;
        let fY = 0.008;
        let fX = -0.012;

        if (weaponType === 'mp5') {
          fZ = -0.24; fY = 0.012; fX = -0.01;
        } else if (weaponType === 'shotgun') {
          fZ = -0.16; fY = -0.018; fX = -0.01;
        } else if (weaponType === 'flamer') {
          fZ = -0.18; fY = 0.012; fX = -0.01;
        }

        // Left forearm enters from bottom left at a natural diagonal to support the rifle
        const lBase = { x: -0.18, y: -0.26, z: 0.04 };
        const lWrist = { x: fX - 0.032, y: fY - 0.038, z: fZ + 0.06 };

        const lArm = this.createBoneMesh(lBase, lWrist, 0.050, 0.038, m.sleeve);
        lGroup.add(lArm);

        // Sleeve cuff
        const lCuff = new THREE.Mesh(new THREE.CylinderGeometry(0.038, 0.040, 0.032, 12), m.sleeveCuff);
        lCuff.position.set(lWrist.x, lWrist.y - 0.002, lWrist.z);
        lCuff.rotation.set(-0.42, -0.22, 0.32);
        lGroup.add(lCuff);

        // Smartwatch on left wrist facing user
        const lWatch = new THREE.Mesh(new THREE.BoxGeometry(0.034, 0.012, 0.036), m.wristWatch);
        lWatch.position.set(lWrist.x + 0.005, lWrist.y + 0.015, lWrist.z);
        lWatch.rotation.set(-0.45, -0.25, 0.35);
        const lWatchFace = new THREE.Mesh(new THREE.PlaneGeometry(0.024, 0.026), m.watchScreen);
        lWatchFace.position.set(0, 0.008, 0);
        lWatchFace.rotation.x = -Math.PI / 2;
        lWatch.add(lWatchFace);
        lGroup.add(lWatch);

        // Left glove palm firmly cradling underneath the handguard
        const lPalm = new THREE.Mesh(new THREE.BoxGeometry(0.046, 0.038, 0.062), m.gloveBase);
        lPalm.position.set(fX - 0.010, fY - 0.014, fZ);
        lPalm.rotation.set(0.12, 0.08, -0.25);
        lGroup.add(lPalm);

        // Knuckles on bottom-left of handguard
        const lKnuckles = new THREE.Mesh(new THREE.BoxGeometry(0.042, 0.014, 0.022), m.knuckleArmor);
        lKnuckles.position.set(fX - 0.024, fY - 0.006, fZ);
        lKnuckles.rotation.set(0.12, 0.08, -0.25);
        lGroup.add(lKnuckles);

        // Thumb resting along side/top rail
        const lThumb = new THREE.Mesh(new THREE.CylinderGeometry(0.0075, 0.009, 0.044, 8), m.gloveBase);
        lThumb.position.set(fX - 0.014, fY + 0.020, fZ + 0.012);
        lThumb.rotation.set(-0.95, 0.25, 0.45);
        lGroup.add(lThumb);

        // Support fingers wrapped under lower rail
        for (let i = 0; i < 3; i++) {
          const lFinger = new THREE.Mesh(new THREE.CylinderGeometry(0.007, 0.008, 0.042, 8), m.gloveBase);
          lFinger.position.set(fX + 0.016, fY - 0.018, fZ - 0.016 + i * 0.016);
          lFinger.rotation.set(0, 0, 1.55);
          lGroup.add(lFinger);
        }
      }

      rig.add(lGroup);
      return rig;
    }

    // ============================================================
    // 1. M1911 TACTICAL OPERATOR SIDEARM (.45 ACP)
    // ============================================================
    buildPistol() {
      const g = new THREE.Group();
      const m = this.mats;

      // Match-grade beveled slide with ejection port cut
      const slide = new THREE.Mesh(new THREE.BoxGeometry(0.042, 0.050, 0.21), m.gunSteel);
      slide.position.set(0, 0.025, 0);

      // Serrations
      for (let s of [-0.08, -0.068, 0.065, 0.077]) {
        const ser = new THREE.Mesh(new THREE.BoxGeometry(0.044, 0.030, 0.004), m.darkParkerized);
        ser.position.set(0, 0.025, s);
        g.add(ser);
      }

      // Match barrel
      const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.011, 0.23, 12), m.chromeSteel);
      barrel.rotation.x = Math.PI / 2;
      barrel.position.set(0, 0.024, -0.02);

      // Tritium Night Sights (Front post + Open U-notch rear with 3 glowing green dots)
      const frontSight = new THREE.Mesh(new THREE.BoxGeometry(0.006, 0.016, 0.012), m.darkParkerized);
      frontSight.position.set(0, 0.062, -0.095);
      const fDot = new THREE.Mesh(new THREE.BoxGeometry(0.003, 0.003, 0.003), m.tritiumDot);
      fDot.position.set(0, 0.062, -0.090);

      // Open U-notch Rear Sight with dual tritium green dots
      const rearL = new THREE.Mesh(new THREE.BoxGeometry(0.010, 0.016, 0.014), m.darkParkerized);
      rearL.position.set(-0.012, 0.062, 0.088);
      const rearR = new THREE.Mesh(new THREE.BoxGeometry(0.010, 0.016, 0.014), m.darkParkerized);
      rearR.position.set(0.012, 0.062, 0.088);
      const rearDotL = new THREE.Mesh(new THREE.BoxGeometry(0.0028, 0.0028, 0.002), m.tritiumDot);
      rearDotL.position.set(-0.012, 0.062, 0.081);
      const rearDotR = new THREE.Mesh(new THREE.BoxGeometry(0.0028, 0.0028, 0.002), m.tritiumDot);
      rearDotR.position.set(0.012, 0.062, 0.081);

      // Polymer Frame
      const frame = new THREE.Mesh(new THREE.BoxGeometry(0.040, 0.044, 0.18), m.darkParkerized);
      frame.position.set(0, -0.016, 0.01);

      // Ergonomic Grip
      const grip = new THREE.Mesh(new THREE.BoxGeometry(0.036, 0.12, 0.052), m.mattePolymer);
      grip.position.set(0, -0.085, 0.072);
      grip.rotation.x = 0.28;

      g.add(slide, barrel, frontSight, fDot, rearL, rearR, rearDotL, rearDotR, frame, grip);
      g.add(this.createHandsRig('pistol'));

      g.position.set(0.16, -0.15, -0.36);
      return g;
    }

    // ============================================================
    // 2. REMINGTON 870 TACTICAL SHOTGUN (12-GAUGE)
    // ============================================================
    buildShotgun() {
      const g = new THREE.Group();
      const m = this.mats;

      // Heavy milled steel receiver
      const receiver = new THREE.Mesh(new THREE.BoxGeometry(0.052, 0.084, 0.26), m.darkParkerized);
      receiver.position.set(0, 0.005, 0.13);

      const bolt = new THREE.Mesh(new THREE.BoxGeometry(0.01, 0.030, 0.075), m.chromeSteel);
      bolt.position.set(0.024, 0.015, 0.11);

      // 12-gauge barrel
      const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.018, 0.60, 14), m.gunSteel);
      barrel.rotation.x = Math.PI / 2;
      barrel.position.set(0, 0.024, -0.22);

      // Perforated heat shield
      const heatShield = new THREE.Mesh(new THREE.CylinderGeometry(0.022, 0.022, 0.34, 14), m.darkParkerized);
      heatShield.rotation.x = Math.PI / 2;
      heatShield.position.set(0, 0.026, -0.16);

      // Extended magazine tube
      const magTube = new THREE.Mesh(new THREE.CylinderGeometry(0.015, 0.015, 0.54, 14), m.gunSteel);
      magTube.rotation.x = Math.PI / 2;
      magTube.position.set(0, -0.016, -0.20);

      // Bead sight
      const bead = new THREE.Mesh(new THREE.SphereGeometry(0.006, 8, 8), m.brassMetal);
      bead.position.set(0, 0.054, -0.50);

      // Tactical Rear Ghost Ring Sight (Forward mounted, thin aperture)
      const ghostRing = new THREE.Mesh(new THREE.TorusGeometry(0.012, 0.0018, 8, 20), m.darkParkerized);
      ghostRing.position.set(0, 0.054, -0.04);

      // Tactical ribbed pump
      const pump = new THREE.Mesh(new THREE.CylinderGeometry(0.025, 0.025, 0.18, 14), m.mattePolymer);
      pump.name = 'shotgunPump';
      pump.rotation.x = Math.PI / 2;
      pump.position.set(0, -0.016, -0.16);

      // Tactical stock (Lowered below sightline)
      const stock = new THREE.Mesh(new THREE.BoxGeometry(0.046, 0.095, 0.30), m.mattePolymer);
      stock.position.set(0, -0.065, 0.36);
      stock.rotation.x = -0.18;

      g.add(receiver, bolt, barrel, heatShield, magTube, bead, ghostRing, pump, stock);
      g.add(this.createHandsRig('shotgun'));

      g.position.set(0.18, -0.16, -0.42);
      return g;
    }

    // ============================================================
    // 3. MP5-SD SUBMACHINE GUN (9MM SUPPRESSED)
    // ============================================================
    buildMP5() {
      const g = new THREE.Group();
      const m = this.mats;

      // Stamped receiver
      const receiver = new THREE.Mesh(new THREE.BoxGeometry(0.050, 0.080, 0.30), m.darkParkerized);
      receiver.position.set(0, 0.005, 0);

      // Suppressor shroud
      const suppressor = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 0.34, 16), m.gunSteel);
      suppressor.rotation.x = Math.PI / 2;
      suppressor.position.set(0, 0.014, -0.30);

      // Banana magazine
      const mag = new THREE.Mesh(new THREE.BoxGeometry(0.026, 0.17, 0.050), m.darkParkerized);
      mag.position.set(0, -0.10, -0.03);
      mag.rotation.x = -0.26;

      // Precision Iron Sights (Protected post + Diopter drum aligned at y=0.056)
      const hoodSight = new THREE.Mesh(new THREE.TorusGeometry(0.013, 0.0022, 8, 16), m.darkParkerized);
      hoodSight.position.set(0, 0.056, -0.36);
      const frontPost = new THREE.Mesh(new THREE.CylinderGeometry(0.0016, 0.0016, 0.014, 6), m.tritiumDot);
      frontPost.position.set(0, 0.056, -0.36);
      const rearDiopter = new THREE.Mesh(new THREE.TorusGeometry(0.012, 0.0022, 8, 16), m.darkParkerized);
      rearDiopter.position.set(0, 0.056, -0.06);

      // Grip
      const grip = new THREE.Mesh(new THREE.BoxGeometry(0.036, 0.12, 0.052), m.mattePolymer);
      grip.position.set(0, -0.08, 0.090);
      grip.rotation.x = 0.28;

      g.add(receiver, suppressor, mag, hoodSight, frontPost, rearDiopter, grip);
      g.add(this.createHandsRig('mp5'));

      g.position.set(0.16, -0.15, -0.38);
      return g;
    }

    // ============================================================
    // 4. M4A1 TACTICAL ASSAULT RIFLE (5.56MM NATO)
    // ============================================================
    buildM4A1() {
      const g = new THREE.Group();
      const m = this.mats;

      // 1. Forged Upper Receiver with realistic finish
      const upper = new THREE.Mesh(new THREE.BoxGeometry(0.048, 0.058, 0.26), m.gunSteel);
      upper.position.set(0, 0.020, 0);

      // Top Picatinny Rail running along upper receiver & handguard
      const picRail = new THREE.Mesh(new THREE.BoxGeometry(0.034, 0.010, 0.44), m.darkParkerized);
      picRail.position.set(0, 0.052, -0.09);

      // Ejection port & silver bolt carrier
      const bolt = new THREE.Mesh(new THREE.BoxGeometry(0.010, 0.024, 0.075), m.chromeSteel);
      bolt.position.set(0.022, 0.024, 0.01);
      const dustCover = new THREE.Mesh(new THREE.BoxGeometry(0.005, 0.022, 0.08), m.darkParkerized);
      dustCover.position.set(0.026, 0.012, 0.01);
      dustCover.rotation.z = 0.45;

      // 2. Lower receiver with flared magwell
      const lower = new THREE.Mesh(new THREE.BoxGeometry(0.045, 0.052, 0.22), m.darkParkerized);
      lower.position.set(0, -0.032, 0.02);

      // 3. Quad-rail Picatinny handguard
      const handguard = new THREE.Mesh(new THREE.BoxGeometry(0.050, 0.052, 0.24), m.darkParkerized);
      handguard.position.set(0, 0.020, -0.22);

      // 4. Fluted match barrel with stainless gas block
      const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.011, 0.013, 0.38, 12), m.chromeSteel);
      barrel.rotation.x = Math.PI / 2;
      barrel.position.set(0, 0.020, -0.41);

      // 5. Birdcage Flash Hider
      const flashHider = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.015, 0.06, 8), m.darkParkerized);
      flashHider.rotation.x = Math.PI / 2;
      flashHider.position.set(0, 0.020, -0.59);

      // 6. TACTICAL EOTECH EXPS3 HOLOGRAPHIC OPTIC (Elevated on QD riser, wide crystal-clear sight picture)
      const holoGroup = new THREE.Group();

      // Quick-Detach (QD) Picatinny Riser Base
      const holoMount = new THREE.Mesh(new THREE.BoxGeometry(0.038, 0.016, 0.11), m.darkParkerized);
      holoMount.position.set(0, 0.064, 0.02);
      const qdLever = new THREE.Mesh(new THREE.BoxGeometry(0.008, 0.012, 0.045), m.chromeSteel);
      qdLever.position.set(0.022, 0.064, 0.02);

      // Protective Aluminum Roll-Cage Hood (Slim beveled walls with wide open aperture)
      const hoodL = new THREE.Mesh(new THREE.BoxGeometry(0.004, 0.046, 0.095), m.gunSteel);
      hoodL.position.set(-0.026, 0.096, 0.02);
      const hoodR = new THREE.Mesh(new THREE.BoxGeometry(0.004, 0.046, 0.095), m.gunSteel);
      hoodR.position.set(0.026, 0.096, 0.02);
      const hoodTop = new THREE.Mesh(new THREE.BoxGeometry(0.056, 0.004, 0.095), m.gunSteel);
      hoodTop.position.set(0, 0.119, 0.02);
      const hoodBottom = new THREE.Mesh(new THREE.BoxGeometry(0.048, 0.005, 0.095), m.gunSteel);
      hoodBottom.position.set(0, 0.073, 0.02);

      // Anti-reflective coated optical glass
      const holoGlass = new THREE.Mesh(new THREE.PlaneGeometry(0.048, 0.042), m.holoLens);
      holoGlass.position.set(0, 0.096, -0.015);

      // High-precision holographic reticle (68 MOA outer ring + 4 quadrant range ticks + 1 MOA center dot)
      const reticleRing = new THREE.Mesh(new THREE.RingGeometry(0.0070, 0.0084, 24), m.holoReticle);
      reticleRing.position.set(0, 0.096, 0.002);
      const reticleDot = new THREE.Mesh(new THREE.CircleGeometry(0.0016, 12), m.holoReticle);
      reticleDot.position.set(0, 0.096, 0.003);

      // 4 quadrant ticks
      const tickTop = new THREE.Mesh(new THREE.PlaneGeometry(0.0015, 0.004), m.holoReticle);
      tickTop.position.set(0, 0.108, 0.002);
      const tickBottom = new THREE.Mesh(new THREE.PlaneGeometry(0.0015, 0.004), m.holoReticle);
      tickBottom.position.set(0, 0.084, 0.002);
      const tickLeft = new THREE.Mesh(new THREE.PlaneGeometry(0.004, 0.0015), m.holoReticle);
      tickLeft.position.set(-0.012, 0.096, 0.002);
      const tickRight = new THREE.Mesh(new THREE.PlaneGeometry(0.004, 0.0015), m.holoReticle);
      tickRight.position.set(0.012, 0.096, 0.002);

      holoGroup.add(
        holoMount, qdLever, hoodL, hoodR, hoodTop, hoodBottom,
        holoGlass, reticleRing, reticleDot, tickTop, tickBottom, tickLeft, tickRight
      );

      // 7. Curved 30-round STANAG magazine with grip ridges
      const mag = new THREE.Mesh(new THREE.BoxGeometry(0.030, 0.18, 0.064), m.darkParkerized);
      mag.position.set(0, -0.11, -0.04);
      mag.rotation.x = -0.16;

      // 8. Ergonomic tactical pistol grip
      const grip = new THREE.Mesh(new THREE.BoxGeometry(0.034, 0.12, 0.052), m.mattePolymer);
      grip.position.set(0, -0.085, 0.088);
      grip.rotation.x = 0.28;

      // 9. Buffer tube & SOPMOD collapsible stock (Positioned at shoulder height, never blocking sightline)
      const bufferTube = new THREE.Mesh(new THREE.CylinderGeometry(0.014, 0.014, 0.22, 10), m.gunSteel);
      bufferTube.rotation.x = Math.PI / 2;
      bufferTube.position.set(0, -0.010, 0.24);

      const stock = new THREE.Mesh(new THREE.BoxGeometry(0.044, 0.080, 0.16), m.mattePolymer);
      stock.position.set(0, -0.050, 0.28);
      const buttpad = new THREE.Mesh(new THREE.BoxGeometry(0.046, 0.090, 0.02), m.darkParkerized);
      buttpad.position.set(0, -0.050, 0.36);

      g.add(
        upper, picRail, bolt, dustCover, lower, handguard, barrel, flashHider,
        holoGroup, mag, grip, bufferTube, stock, buttpad
      );

      // Attach complete two-handed tactical arms rig
      g.add(this.createHandsRig('m4a1'));

      g.position.set(0.17, -0.16, -0.40);
      return g;
    }

    // ============================================================
    // 5. .357 LAZARUS MAGNUM (CUSTOM COMBAT REVOLVER)
    // ============================================================
    buildMagnum() {
      const g = new THREE.Group();
      const m = this.mats;

      // Mirror-polished heavy barrel
      const barrel = new THREE.Mesh(new THREE.BoxGeometry(0.036, 0.064, 0.32), m.chromeSteel);
      barrel.position.set(0, 0.022, -0.13);

      // Front sight ramp
      const frontRamp = new THREE.Mesh(new THREE.BoxGeometry(0.008, 0.018, 0.02), m.chromeSteel);
      frontRamp.position.set(0, 0.068, -0.27);
      const redInsert = new THREE.Mesh(new THREE.BoxGeometry(0.0085, 0.012, 0.012), m.shellRed);
      redInsert.position.set(0, 0.069, -0.265);

      // Rear sight notch (Open target notch)
      const rearL = new THREE.Mesh(new THREE.BoxGeometry(0.010, 0.016, 0.012), m.darkParkerized);
      rearL.position.set(-0.011, 0.068, 0.08);
      const rearR = new THREE.Mesh(new THREE.BoxGeometry(0.010, 0.016, 0.012), m.darkParkerized);
      rearR.position.set(0.011, 0.068, 0.08);

      // Fluted cylinder
      const cylinder = new THREE.Mesh(new THREE.CylinderGeometry(0.036, 0.036, 0.090, 14), m.chromeSteel);
      cylinder.rotation.x = Math.PI / 2;
      cylinder.position.set(0, 0.012, 0.07);

      // Frame & hammer
      const frame = new THREE.Mesh(new THREE.BoxGeometry(0.040, 0.072, 0.17), m.darkParkerized);
      frame.position.set(0, -0.01, 0.10);

      const hammer = new THREE.Mesh(new THREE.BoxGeometry(0.013, 0.030, 0.030), m.chromeSteel);
      hammer.position.set(0, 0.044, 0.150);
      hammer.rotation.x = 0.65;

      // Walnut woodgrain grip
      const grip = new THREE.Mesh(new THREE.BoxGeometry(0.042, 0.135, 0.068), m.checkeredWood);
      grip.position.set(0, -0.085, 0.155);
      grip.rotation.x = 0.32;

      g.add(barrel, frontRamp, redInsert, rearL, rearR, cylinder, frame, hammer, grip);
      g.add(this.createHandsRig('magnum'));

      g.position.set(0.16, -0.14, -0.36);
      return g;
    }

    // ============================================================
    // 6. CHEMICAL INCINERATOR (MILITARY FLAMETHROWER)
    // ============================================================
    buildFlamer() {
      const g = new THREE.Group();
      const m = this.mats;

      // Twin pressurized fuel canisters
      const tankMat = new THREE.MeshStandardMaterial({ color: 0xd97706, roughness: 0.38, metalness: 0.25 });
      const tank1 = new THREE.Mesh(new THREE.CylinderGeometry(0.042, 0.042, 0.34, 14), tankMat);
      tank1.rotation.x = Math.PI / 2;
      tank1.position.set(-0.046, -0.052, 0.05);

      const tank2 = tank1.clone();
      tank2.position.x = 0.046;

      // Brass retention bands
      for (let z of [-0.07, 0.15]) {
        const band = new THREE.Mesh(new THREE.BoxGeometry(0.14, 0.02, 0.02), m.brassMetal);
        band.position.set(0, -0.052, z);
        g.add(band);
      }

      // Nozzle shroud
      const nozzle = new THREE.Mesh(new THREE.CylinderGeometry(0.030, 0.050, 0.32, 14), m.gunSteel);
      nozzle.rotation.x = Math.PI / 2;
      nozzle.position.set(0, 0.018, -0.24);

      // Pilot flame
      const pilot = new THREE.Mesh(new THREE.ConeGeometry(0.012, 0.040, 8), m.flamePilot);
      pilot.rotation.x = -Math.PI / 2;
      pilot.position.set(0, 0.018, -0.40);

      g.add(tank1, tank2, nozzle, pilot);
      g.add(this.createHandsRig('flamer'));

      g.position.set(0.18, -0.16, -0.40);
      return g;
    }

    /**
     * Builds all 6 weapons and adds them to the parent gunGroup.
     */
    static createAll(parentGroup) {
      const builder = new WeaponModelBuilder();
      const models = {
        pistol: builder.buildPistol(),
        shotgun: builder.buildShotgun(),
        mp5: builder.buildMP5(),
        m4a1: builder.buildM4A1(),
        magnum: builder.buildMagnum(),
        flamer: builder.buildFlamer()
      };

      for (const [id, grp] of Object.entries(models)) {
        grp.visible = (id === 'm4a1'); // M4A1 active by default
        parentGroup.add(grp);
      }

      return models;
    }
  }

  window.WeaponModelBuilder = WeaponModelBuilder;
})(window);
