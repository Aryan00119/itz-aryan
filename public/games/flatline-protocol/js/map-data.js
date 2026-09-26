/**
 * ST. AGNES MERCY: FLATLINE PROTOCOL 3D
 * Expanded Map Architecture, Continuous Foundation, & Level Construction
 */

(function (window) {
  'use strict';

  // Expanded 14-Room Facility World Layout (Meters)
  const EXPANDED_ROOMS = [
    // Zone 1: North Wing
    { id: 'lobby', name: 'Entrance Lobby', x: 0, z: 42, w: 30, d: 24, h: 4.2, color: 0x1c241c, lightCol: 0xfff0d0 },
    { id: 'cor_north', name: 'North Triage Hall', x: 0, z: 24, w: 10, d: 16, h: 4.2, color: 0x161e16, lightCol: 0x8fbf8f },
    { id: 'records', name: 'Records & Archives', x: -26, z: 42, w: 20, d: 22, h: 4.2, color: 0x1e241c, lightCol: 0xf4a261 },
    { id: 'security', name: 'Surveillance Control', x: 26, z: 42, w: 20, d: 22, h: 4.2, color: 0x162024, lightCol: 0x48cae4 },

    // Zone 2: West Wing (Quarantine & ICU)
    { id: 'cor_west', name: 'West Quarantine Concourse', x: -16, z: 12, w: 14, d: 8, h: 4.2, color: 0x151c15, lightCol: 0x8fbf8f },
    { id: 'wardA', name: 'Ward A (Quarantine)', x: -36, z: 12, w: 26, d: 24, h: 4.2, color: 0x1e281e, lightCol: 0x8fbf8f },
    { id: 'icu', name: 'Intensive Care Unit (ICU)', x: -60, z: 12, w: 22, d: 22, h: 4.2, color: 0x1c2a26, lightCol: 0x52f28b },

    // Zone 3: Central Facility (Crossroad Hallway & Sanctuary)
    { id: 'cor_central', name: 'Central Crossroad', x: 0, z: 6, w: 10, d: 24, h: 4.2, color: 0x161d16, lightCol: 0x8fbf8f },
    { id: 'chapel', name: 'Sanctuary Chapel', x: 0, z: -14, w: 24, d: 22, h: 4.2, color: 0x221c2b, lightCol: 0x7c6999 },
    { id: 'cor_south', name: 'South Transit Hall', x: 0, z: -28, w: 10, d: 12, h: 4.2, color: 0x141a14, lightCol: 0x48cae4 },

    // Zone 4: East Wing (Isolation & Bio-Research Lab)
    { id: 'cor_east', name: 'East Isolation Concourse', x: 16, z: 12, w: 14, d: 8, h: 4.2, color: 0x151c15, lightCol: 0x8fbf8f },
    { id: 'wardB', name: 'Ward B (Isolation)', x: 36, z: 12, w: 26, d: 24, h: 4.2, color: 0x1e281e, lightCol: 0x8fbf8f },
    { id: 'biolab', name: 'BSL-4 Bio-Research Lab', x: 60, z: 12, w: 22, d: 22, h: 4.2, color: 0x202618, lightCol: 0x99ff22 },

    // Zone 5: Sub-Level Power Hub & Emergency
    { id: 'cor_gen', name: 'West Utility Corridor', x: -18, z: -14, w: 12, d: 8, h: 4.2, color: 0x171e18, lightCol: 0xf4a261 },
    { id: 'generator', name: 'Primary Generator Hub', x: -36, z: -14, w: 26, d: 22, h: 4.2, color: 0x1b221d, lightCol: 0xf4a261 },
    { id: 'cor_er', name: 'East Medical Corridor', x: 18, z: -14, w: 12, d: 8, h: 4.2, color: 0x171e18, lightCol: 0x8fbf8f },
    { id: 'er', name: 'Emergency Room (ER)', x: 36, z: -14, w: 26, d: 22, h: 4.2, color: 0x261c1c, lightCol: 0xe63946 },

    // Zone 6: Deep Sub-Basement (Morgue, Conduit, Ambulance Dock)
    { id: 'morgue', name: 'Morgue Sub-Station', x: 0, z: -44, w: 28, d: 24, h: 4.2, color: 0x162228, lightCol: 0x48cae4 },
    { id: 'conduit', name: 'Maintenance Conduit Tunnel', x: -24, z: -44, w: 20, d: 10, h: 3.8, color: 0x131714, lightCol: 0xd4af37 },
    { id: 'cor_amb', name: 'Evacuation Airlock', x: 20, z: -44, w: 14, d: 8, h: 4.2, color: 0x171e22, lightCol: 0x8fbf8f },
    { id: 'ambulance', name: 'Ambulance Bay & Dock', x: 42, z: -44, w: 28, d: 26, h: 4.2, color: 0x181e22, lightCol: 0x52f28b }
  ];

  class MapBuilder {
    constructor(game) {
      this.game = game;
      this.scene = game.scene;
    }

    buildAll() {
      // 1. MASTER FOUNDATION SUBFLOOR SLAB (Eliminates ANY black ground or void gap anywhere!)
      this.buildMasterFoundation();

      // 2. Room Floors with proper linoleum tile textures
      this.buildRoomFloors();

      // 3. Hallway & Doorway Threshold Fill Tiles (Zero gaps between rooms!)
      this.buildCorridorConnectors();

      // 4. Fully Enclosed Walls & Door Lintels
      this.buildFacilityWalls();

      // 5. Seamless Unified Hospital Ceiling
      this.buildMasterCeiling();

      // 6. Interactive Security Gates & Puzzles
      this.setupPuzzleGates();

      // 7. Ambient Lighting & Fluorescent Fixtures
      this.setupIllumination();

      // 8. High-Fidelity Room Props & Set Pieces
      this.spawnExpandedProps();
    }

    /* ---------------- 1. MASTER FOUNDATION SLAB ---------------- */
    buildMasterFoundation() {
      // 240m x 240m dark industrial concrete foundation slab under the entire map
      const c = document.createElement('canvas');
      c.width = 512; c.height = 512;
      const ctx = c.getContext('2d');
      ctx.fillStyle = '#111612';
      ctx.fillRect(0, 0, 512, 512);

      // Subtle concrete grit & expansion joint seams
      ctx.strokeStyle = '#080d09';
      ctx.lineWidth = 2;
      for (let i = 0; i < 512; i += 64) {
        ctx.strokeRect(i, 0, 64, 512);
        ctx.strokeRect(0, i, 512, 64);
      }
      for (let i = 0; i < 400; i++) {
        ctx.fillStyle = Math.random() > 0.5 ? 'rgba(5, 8, 5, 0.4)' : 'rgba(30, 40, 30, 0.3)';
        ctx.fillRect(Math.random() * 512, Math.random() * 512, 2, 2);
      }

      const fTex = new THREE.CanvasTexture(c);
      fTex.wrapS = THREE.RepeatWrapping;
      fTex.wrapT = THREE.RepeatWrapping;
      fTex.repeat.set(30, 30);

      const fMat = new THREE.MeshStandardMaterial({
        map: fTex,
        roughness: 0.9,
        metalness: 0.05
      });

      const foundationGeo = new THREE.PlaneGeometry(260, 260);
      const foundationMesh = new THREE.Mesh(foundationGeo, fMat);
      foundationMesh.rotation.x = -Math.PI / 2;
      foundationMesh.position.set(0, -0.01, 0); // Positioned right under room floors
      foundationMesh.receiveShadow = true;
      this.scene.add(foundationMesh);
    }

    /* ---------------- 2. ROOM FLOORS ---------------- */
    buildRoomFloors() {
      const floorMat = new THREE.MeshStandardMaterial({
        map: this.game.texFloor,
        roughness: 0.88,
        metalness: 0.0
      });

      for (const r of EXPANDED_ROOMS) {
        const geo = new THREE.PlaneGeometry(r.w, r.d);
        const mesh = new THREE.Mesh(geo, floorMat);
        mesh.rotation.x = -Math.PI / 2;
        mesh.position.set(r.x, 0, r.z);
        mesh.receiveShadow = true;
        this.scene.add(mesh);

        // Gentle ambient room fill light
        const rColor = r.lightCol || 0x8fbf8f;
        const pLight = new THREE.PointLight(rColor, 0.55, 26, 2.0);
        pLight.position.set(r.x, r.h - 0.2, r.z);
        this.scene.add(pLight);
      }
    }

    /* ---------------- 3. CORRIDOR & THRESHOLD FILL TILES ---------------- */
    buildCorridorConnectors() {
      // Seamless floor patches connecting room thresholds so players never step on seam lines
      const floorMat = new THREE.MeshStandardMaterial({
        map: this.game.texFloor,
        roughness: 0.88,
        metalness: 0.0
      });

      const connectors = [
        // Lobby to North Hallway threshold
        { x: 0, z: 33, w: 10, d: 4 },
        // North Hallway to Central Crossroad
        { x: 0, z: 17, w: 10, d: 4 },
        // Central Hallway to West Concourse
        { x: -7, z: 12, w: 6, d: 8 },
        // West Concourse to Ward A
        { x: -23, z: 12, w: 6, d: 8 },
        // Ward A to ICU doorway threshold
        { x: -49, z: 12, w: 6, d: 8 },
        // Central Hallway to East Concourse
        { x: 7, z: 12, w: 6, d: 8 },
        // East Concourse to Ward B
        { x: 23, z: 12, w: 6, d: 8 },
        // Ward B to Bio-Research Lab
        { x: 49, z: 12, w: 6, d: 8 },
        // Central Crossroad to Chapel
        { x: 0, z: -4, w: 10, d: 6 },
        // Chapel to South Transit Hall
        { x: 0, z: -24, w: 10, d: 6 },
        // South Transit Hall to Morgue
        { x: 0, z: -33, w: 10, d: 6 },
        // Chapel to West Power Corridor
        { x: -11, z: -14, w: 6, d: 8 },
        // West Power Corridor to Generator
        { x: -24, z: -14, w: 6, d: 8 },
        // Chapel to East Medical Corridor
        { x: 11, z: -14, w: 6, d: 8 },
        // East Medical Corridor to ER
        { x: 24, z: -14, w: 6, d: 8 },
        // Generator to Maintenance Conduit Tunnel
        { x: -24, z: -27, w: 10, d: 8 },
        // Morgue to Evacuation Airlock
        { x: 14, z: -44, w: 6, d: 8 },
        // Evacuation Airlock to Ambulance Bay
        { x: 27, z: -44, w: 6, d: 8 }
      ];

      for (const c of connectors) {
        const geo = new THREE.PlaneGeometry(c.w, c.d);
        const mesh = new THREE.Mesh(geo, floorMat);
        mesh.rotation.x = -Math.PI / 2;
        mesh.position.set(c.x, 0.005, c.z);
        mesh.receiveShadow = true;
        this.scene.add(mesh);
      }
    }

    /* ---------------- 4. FACILITY WALLS & PERIMETERS ---------------- */
    buildFacilityWalls() {
      const addWall = (x, z, w, d, h = 4.2) => this.game.addWall(x, z, w, d, h);
      const addLintel = (x, z, w, d, botY = 2.7, topY = 4.2) => this.game.addDoorLintel(x, z, w, d, botY, topY);

      // 1. Lobby Walls
      addWall(0, 54, 32, 0.6);        // Lobby North exterior
      addWall(-15.3, 42, 0.6, 24);    // Lobby West
      addWall(15.3, 42, 0.6, 24);     // Lobby East
      // Lobby South Partition with Central Hallway opening
      addWall(-10, 30, 11, 0.6);
      addWall(10, 30, 11, 0.6);
      addLintel(0, 30, 5, 0.6);

      // 2. North Corridor & Records / Security Wing
      addWall(-5.3, 24, 0.6, 12);     // West corridor wall
      addWall(5.3, 24, 0.6, 12);      // East corridor wall
      // Records Office
      addWall(-36.3, 42, 0.6, 22);
      addWall(-26, 53.3, 21, 0.6);
      addWall(-26, 30.7, 21, 0.6);
      // Security Surveillance Room
      addWall(36.3, 42, 0.6, 22);
      addWall(26, 53.3, 21, 0.6);
      addWall(26, 30.7, 21, 0.6);

      // 3. Central Corridor & Wing Junctions (x: -5 to +5, z: 18 to -6)
      addWall(-5.3, 17, 0.6, 4);
      addWall(-5.3, 7, 0.6, 4);
      addLintel(-5.3, 12, 0.6, 6);     // Doorway to West Concourse

      addWall(5.3, 17, 0.6, 4);
      addWall(5.3, 7, 0.6, 4);
      addLintel(5.3, 12, 0.6, 6);      // Doorway to East Concourse

      // 4. Ward A & ICU (West Wing)
      addWall(-36, 24.3, 27, 0.6);    // Ward A North
      addWall(-36, -0.3, 27, 0.6);    // Ward A South
      // Partition between Ward A and ICU
      addWall(-49.3, 18, 0.6, 12);
      addWall(-49.3, 6, 0.6, 12);
      addLintel(-49.3, 12, 0.6, 5);   // ICU Blast Gate Portal
      // ICU Outer Perimeter
      addWall(-71.3, 12, 0.6, 23);
      addWall(-60, 23.3, 23, 0.6);
      addWall(-60, 0.7, 23, 0.6);

      // 5. Ward B & Bio-Research Lab (East Wing)
      addWall(36, 24.3, 27, 0.6);     // Ward B North
      addWall(36, -0.3, 27, 0.6);     // Ward B South
      // Partition between Ward B and Bio-Lab
      addWall(49.3, 18, 0.6, 12);
      addWall(49.3, 6, 0.6, 12);
      addLintel(49.3, 12, 0.6, 5);    // Bio-Lab Portal
      // Bio-Lab Outer Perimeter
      addWall(71.3, 12, 0.6, 23);
      addWall(60, 23.3, 23, 0.6);
      addWall(60, 0.7, 23, 0.6);

      // 6. Chapel & Sub-Level Transit
      addWall(-12.3, -14, 0.6, 23);   // Chapel West
      addWall(12.3, -14, 0.6, 23);    // Chapel East
      addWall(-8, -25.3, 10, 0.6);    // Chapel South Left
      addWall(8, -25.3, 10, 0.6);     // Chapel South Right
      addLintel(0, -25.3, 6, 0.6);    // Portal to South Transit

      // 7. Generator Room Hub & Maintenance Conduit
      addWall(-36, -2.7, 27, 0.6);    // Gen North
      addWall(-49.3, -14, 0.6, 23);   // Gen West
      addWall(-36, -25.3, 27, 0.6);   // Gen South
      addLintel(-23, -14, 0.6, 6);    // Airlock Gate to Generator

      // 8. Emergency Room (ER)
      addWall(36, -2.7, 27, 0.6);     // ER North
      addWall(49.3, -14, 0.6, 23);    // ER East
      addWall(36, -25.3, 27, 0.6);    // ER South

      // 9. Morgue Sub-Station (Boss Arena)
      addWall(-14.3, -44, 0.6, 25);   // Morgue West
      addWall(14.3, -44, 0.6, 25);    // Morgue East
      addWall(0, -56.3, 29, 0.6);     // Morgue Far South
      addLintel(0, -31.7, 6, 0.6);    // Entrance to Morgue

      // 10. Ambulance Bay & Evacuation Perimeter
      addWall(42, -30.7, 29, 0.6);    // Amb North
      addWall(42, -57.3, 29, 0.6);    // Amb South
      addWall(56.3, -44, 0.6, 27);    // Amb Far East Dock
      addLintel(27, -44, 0.6, 6);     // Ambulance Security Gate Portal
    }

    /* ---------------- 5. MASTER SEAMLESS CEILING ---------------- */
    buildMasterCeiling() {
      // Single continuous plane at y = 4.0m covering entire hospital facility
      const ceilingMat = new THREE.MeshStandardMaterial({
        map: this.game.texCeiling,
        roughness: 0.9,
        metalness: 0.05,
        side: THREE.DoubleSide
      });
      const ceilingGeo = new THREE.PlaneGeometry(160, 160);
      const ceilingMesh = new THREE.Mesh(ceilingGeo, ceilingMat);
      ceilingMesh.rotation.x = Math.PI / 2;
      ceilingMesh.position.set(0, 4.0, 0);
      ceilingMesh.receiveShadow = true;
      this.scene.add(ceilingMesh);
    }

    /* ---------------- 6. INTERACTIVE PUZZLE GATES ---------------- */
    setupPuzzleGates() {
      if (!this.game.puzzleSystem) return;

      // 1. ICU Blast Gate (Keypad Locked: Code 4815, found in Clara's triage dossier)
      this.game.puzzleSystem.registerGate({
        id: 'gate_icu',
        x: -49.3, z: 12, w: 0.5, d: 5.2, h: 4.0,
        type: 'keypad',
        code: '4815',
        label: 'ICU BLAST GATE',
        openY: 4.4
      });

      // 2. Generator Auxiliary Power Breaker Airlock (Requires 100V Voltage Balancing Puzzle)
      this.game.puzzleSystem.registerGate({
        id: 'gate_generator',
        x: -23, z: -14, w: 0.5, d: 5.4, h: 4.0,
        type: 'breaker',
        label: 'GENERATOR AIRLOCK',
        openY: 4.4
      });

      // 3. Ambulance Bay Gate (Standard Red Keycard Unlock)
      this.game.createDoorGate({
        id: 'gate_ambulance',
        x: 27, z: -44, w: 0.5, d: 5.5, h: 4.2,
        need: 'redKey',
        label: 'EVACUATION DOCK'
      });
    }

    /* ---------------- 7. ILLUMINATION & FLUORESCENTS ---------------- */
    setupIllumination() {
      // Soft atmospheric ceiling light fixtures at major corridor crossroads
      const corridorLights = [
        { x: 0, y: 3.8, z: 36, color: 0xfff0d0, int: 1.8 },
        { x: 0, y: 3.8, z: 20, color: 0x8fbf8f, int: 1.6 },
        { x: -16, y: 3.8, z: 12, color: 0x8fbf8f, int: 1.7 },
        { x: 16, y: 3.8, z: 12, color: 0x8fbf8f, int: 1.7 },
        { x: 0, y: 3.8, z: 0, color: 0x8fbf8f, int: 1.7 },
        { x: 0, y: 3.8, z: -20, color: 0x7c6999, int: 1.8 },
        { x: -18, y: 3.8, z: -14, color: 0xf4a261, int: 1.7 },
        { x: 18, y: 3.8, z: -14, color: 0xe63946, int: 1.7 },
        { x: 0, y: 3.8, z: -38, color: 0x48cae4, int: 2.0 },
        { x: 20, y: 3.8, z: -44, color: 0x52f28b, int: 1.8 }
      ];

      for (const pos of corridorLights) {
        const pLight = new THREE.PointLight(pos.color, pos.int * 0.45, 18, 2.0);
        pLight.position.set(pos.x, pos.y - 0.2, pos.z);
        this.scene.add(pLight);
      }
    }

    /* ---------------- 8. PROPS FOR EXPANDED ROOMS ---------------- */
    spawnExpandedProps() {
      const metalMat = new THREE.MeshStandardMaterial({ color: 0x222822, metalness: 0.8, roughness: 0.3 });
      const greenGlow = new THREE.MeshBasicMaterial({ color: 0x52f28b });

      // 1. Bio-Research Lab Specimen Cylinders with glowing Thanatos fluid
      for (let i = 0; i < 3; i++) {
        const cylGroup = new THREE.Group();
        const base = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.7, 0.3, 14), metalMat);
        const glass = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 2.4, 14), new THREE.MeshStandardMaterial({
          color: 0x33aa55, transparent: true, opacity: 0.45, roughness: 0.1
        }));
        glass.position.y = 1.35;
        const top = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 0.25, 14), metalMat);
        top.position.y = 2.65;
        const fluid = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.35, 2.0, 10), greenGlow);
        fluid.position.y = 1.3;

        cylGroup.add(base, glass, top, fluid);
        cylGroup.position.set(56 + i * 4, 0, 12 + (i % 2 === 0 ? 3 : -3));
        this.scene.add(cylGroup);
      }

      // 2. ICU Heart Monitors and Hospital Beds
      for (let i = 0; i < 3; i++) {
        const bedGroup = new THREE.Group();
        const frame = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.4, 2.2), metalMat);
        frame.position.y = 0.3;
        const mattress = new THREE.Mesh(new THREE.BoxGeometry(1.1, 0.2, 2.1), new THREE.MeshStandardMaterial({ color: 0xdde5dd, roughness: 0.9 }));
        mattress.position.y = 0.55;
        const monitorStand = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 1.8), metalMat);
        monitorStand.position.set(-0.7, 0.9, 0.8);
        const monitorScreen = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.3, 0.1), greenGlow);
        monitorScreen.position.set(-0.7, 1.8, 0.8);

        bedGroup.add(frame, mattress, monitorStand, monitorScreen);
        bedGroup.position.set(-56 - i * 4, 0, 12 + (i % 2 === 0 ? 3.5 : -3.5));
        this.scene.add(bedGroup);
      }

      // 3. Clear Narrative Blood Writing on Wall in Ward A entrance pointing directly to Clara's Desk
      const cCanvas = document.createElement('canvas');
      cCanvas.width = 512; cCanvas.height = 128;
      const cCtx = cCanvas.getContext('2d');
      cCtx.fillStyle = 'rgba(0,0,0,0)';
      cCtx.clearRect(0, 0, 512, 128);
      cCtx.fillStyle = '#9e0b0b';
      cCtx.font = 'bold 26px monospace';
      cCtx.fillText('BLUE KEYCARD AT CLARA\'S DESK -->', 20, 65);
      cCtx.font = '16px monospace';
      cCtx.fillText('CODE FOR ICU GATE IS: 4 8 1 5', 20, 100);

      const clueTex = new THREE.CanvasTexture(cCanvas);
      const clueMat = new THREE.MeshBasicMaterial({ map: clueTex, transparent: true });
      const clueMesh = new THREE.Mesh(new THREE.PlaneGeometry(5.0, 1.25), clueMat);
      clueMesh.position.set(-23.5, 2.2, 12);
      clueMesh.rotation.y = Math.PI / 2;
      this.scene.add(clueMesh);
    }
  }

  window.EXPANDED_ROOMS = EXPANDED_ROOMS;
  window.MapBuilder = MapBuilder;
})(window);
