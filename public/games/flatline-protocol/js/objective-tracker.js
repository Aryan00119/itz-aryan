/**
 * ST. AGNES MERCY: FLATLINE PROTOCOL 3D
 * Complex Keycard Investigation & Objective Tracker
 * (Multi-step quest: Records Search -> Triage Key -> Secure Locker A-104 -> Blue Keycard)
 */

(function (window) {
  'use strict';

  class ObjectiveTracker {
    constructor(game) {
      this.game = game;
      this.camera = game.camera;
      this.scene = game.scene;
      this.activeObjective = null;
      this.beacons = [];
      this.lastPingTime = 0;
      this.hasTriageKey = false;

      this.createHUDOverlay();
      this.buildTriageLocker();
    }

    createHUDOverlay() {
      // 1. Compass Bar at Top Center
      const compassWrap = document.createElement('div');
      compassWrap.id = 'hudCompassWrap';
      compassWrap.innerHTML = `
        <div id="compassTape">
          <div id="compassMarkers">
            <span>N</span><span>45</span><span>E</span><span>135</span><span>S</span><span>225</span><span>W</span><span>315</span>
          </div>
          <div id="compassObjectiveIcon">◆</div>
          <div id="compassReticle">▼</div>
        </div>
        <div id="compassDistanceLabel">SECTOR SCANNER: INITIALIZING...</div>
      `;
      document.body.appendChild(compassWrap);

      // 2. 3D Floating World Waypoint Tag
      const waypointTag = document.createElement('div');
      waypointTag.id = 'hudWorldWaypoint';
      waypointTag.innerHTML = `
        <div class="wpIcon">◆</div>
        <div class="wpText" id="wpText">INVESTIGATION POINT</div>
        <div class="wpDist" id="wpDist">28M</div>
      `;
      document.body.appendChild(waypointTag);

      // Styles
      const style = document.createElement('style');
      style.textContent = `
        #hudCompassWrap {
          position: absolute;
          top: 12px;
          left: 50%;
          transform: translateX(-50%);
          width: 340px;
          display: flex;
          flex-direction: column;
          align-items: center;
          pointer-events: none;
          z-index: 12;
          font-family: 'Rajdhani', 'Chakra Petch', sans-serif;
        }
        #compassTape {
          width: 100%;
          height: 28px;
          background: rgba(8, 14, 10, 0.82);
          border: 1px solid rgba(82, 242, 139, 0.45);
          border-radius: 4px;
          position: relative;
          overflow: hidden;
          box-shadow: 0 4px 18px rgba(0,0,0,0.85);
        }
        #compassReticle {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          color: #52f28b;
          font-size: 11px;
          line-height: 11px;
          font-weight: bold;
        }
        #compassMarkers {
          position: absolute;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0 10px;
          box-sizing: border-box;
          font-size: 11px;
          font-weight: 700;
          color: #729676;
          letter-spacing: 1px;
        }
        #compassObjectiveIcon {
          position: absolute;
          top: 6px;
          left: 50%;
          transform: translateX(-50%);
          color: #48cae4;
          font-size: 15px;
          line-height: 15px;
          transition: left 0.04s linear;
          text-shadow: 0 0 8px #48cae4;
        }
        #compassDistanceLabel {
          font-size: 12px;
          font-weight: 700;
          letter-spacing: 1.5px;
          color: #52f28b;
          margin-top: 6px;
          text-shadow: 0 0 8px rgba(82, 242, 139, 0.6);
          background: rgba(10, 16, 12, 0.75);
          border: 1px solid rgba(82, 242, 139, 0.25);
          padding: 3px 12px;
          border-radius: 3px;
        }
        #hudWorldWaypoint {
          position: absolute;
          pointer-events: none;
          z-index: 11;
          display: none;
          transform: translate(-50%, -50%);
          text-align: center;
          font-family: 'Rajdhani', 'Chakra Petch', sans-serif;
          transition: opacity 0.15s;
        }
        #hudWorldWaypoint .wpIcon {
          font-size: 18px;
          color: #48cae4;
          text-shadow: 0 0 8px #48cae4;
        }
        #hudWorldWaypoint .wpText {
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 1.5px;
          color: #fff;
          background: rgba(10, 18, 12, 0.88);
          border: 1px solid #48cae4;
          padding: 2px 8px;
          border-radius: 3px;
          white-space: nowrap;
          margin-top: 2px;
        }
        #hudWorldWaypoint .wpDist {
          font-size: 10px;
          color: #48cae4;
          font-weight: 700;
          margin-top: 1px;
        }
      `;
      document.head.appendChild(style);
    }

    /* ---------------- BUILD PHYSICAL 3D TRIAGE LOCKER ---------------- */
    buildTriageLocker() {
      // Secure Heavy Hospital Locker in Ward A (holds the Blue Keycard inside!)
      const lx = -36, lz = 18;
      const lockerGroup = new THREE.Group();

      const metalMat = new THREE.MeshStandardMaterial({ color: 0x222a22, metalness: 0.8, roughness: 0.35 });
      const doorMat = new THREE.MeshStandardMaterial({ color: 0x2e382e, metalness: 0.85, roughness: 0.3 });

      // Frame
      const frame = new THREE.Mesh(new THREE.BoxGeometry(1.2, 2.4, 0.8), metalMat);
      frame.position.y = 1.2;

      // Heavy Door (Hinged to animate open)
      const door = new THREE.Mesh(new THREE.BoxGeometry(1.1, 2.3, 0.08), doorMat);
      door.position.set(0, 1.2, 0.42);

      // Electronic Keypad Status Screen on Locker Door
      const screenMat = new THREE.MeshBasicMaterial({ color: 0xe63946 }); // Red locked status
      const screen = new THREE.Mesh(new THREE.BoxGeometry(0.35, 0.18, 0.04), screenMat);
      screen.position.set(0, 1.5, 0.48);

      lockerGroup.add(frame, door, screen);
      lockerGroup.position.set(lx, 0, lz);
      this.scene.add(lockerGroup);

      // Dedicated examination lamp
      const lamp = new THREE.SpotLight(0xfff0d0, 1.8, 7, Math.PI / 4, 0.6);
      lamp.position.set(lx, 3.8, lz);
      lamp.target = frame;
      this.scene.add(lamp);

      this.triageLocker = {
        x: lx, z: lz,
        group: lockerGroup,
        door,
        screen,
        screenMat,
        opened: false
      };

      // Add collider
      this.game.colliders.push({
        minX: lx - 0.7, maxX: lx + 0.7,
        minZ: lz - 0.5, maxZ: lz + 0.5
      });
    }

    /* ---------------- 3D FLOATING RFID KEYCARD ITEM ---------------- */
    spawnKeycardItem(x, z, type = 'key_blue') {
      const cardGroup = new THREE.Group();
      const colorHex = (type === 'key_blue') ? 0x48cae4 : 0xe63946;

      const c = document.createElement('canvas');
      c.width = 256; c.height = 160;
      const ctx = c.getContext('2d');
      ctx.fillStyle = '#151c16';
      ctx.fillRect(0, 0, 256, 160);

      ctx.fillStyle = type === 'key_blue' ? '#0077b6' : '#b81414';
      ctx.fillRect(0, 0, 256, 42);

      ctx.fillStyle = '#d4af37';
      ctx.fillRect(24, 60, 36, 32);

      ctx.fillStyle = '#fff';
      ctx.font = 'bold 16px sans-serif';
      ctx.fillText(type === 'key_blue' ? 'BLUE CLEARANCE' : 'RED MASTER', 14, 28);
      ctx.font = '12px sans-serif';
      ctx.fillText('ST. AGNES MERCY', 70, 78);

      const cardTex = new THREE.CanvasTexture(c);
      const cardMat = new THREE.MeshStandardMaterial({ map: cardTex, roughness: 0.35, metalness: 0.2 });
      const cardMesh = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.3, 0.02), cardMat);
      cardGroup.add(cardMesh);

      // Glowing laser edge
      const rimMat = new THREE.MeshBasicMaterial({ color: colorHex });
      const rim = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.015, 0.025), rimMat);
      rim.position.y = 0.15;
      cardGroup.add(rim);

      cardGroup.position.set(x, 1.1, z);
      this.scene.add(cardGroup);

      const itemObj = {
        type, x, z,
        mesh: cardGroup,
        baseY: 1.1,
        taken: false
      };
      this.beacons.push(itemObj);

      // Register into game pickups list so player can grab it!
      this.game.pickups.push({
        type, x, z,
        label: type === 'key_blue' ? 'BLUE SECURITY KEYCARD' : 'RED SECURITY KEYCARD',
        mesh: cardGroup,
        taken: false
      });

      return itemObj;
    }

    /* ---------------- DR. OKAFOR'S TRIAGE KEY IN RECORDS ---------------- */
    spawnTriageKeyInRecords() {
      const kGroup = new THREE.Group();
      const goldMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.95, roughness: 0.2 });
      const keyMesh = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.02, 0.26), goldMat);
      const keyHead = new THREE.Mesh(new THREE.TorusGeometry(0.06, 0.015, 8, 12), goldMat);
      keyHead.position.z = 0.14;
      keyHead.rotation.x = Math.PI / 2;
      kGroup.add(keyMesh, keyHead);

      const x = -26, z = 42; // Records Archive
      kGroup.position.set(x, 0.88, z);
      this.scene.add(kGroup);

      // Table in records
      const table = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.08, 0.8), new THREE.MeshStandardMaterial({ color: 0x222a22 }));
      table.position.set(x, 0.8, z);
      this.scene.add(table);

      // Light on table
      const tLight = new THREE.SpotLight(0xfff0d0, 1.6, 6, Math.PI / 4, 0.5);
      tLight.position.set(x, 3.8, z);
      tLight.target = table;
      this.scene.add(tLight);

      this.triageKeyItem = {
        type: 'triage_key', x, z,
        mesh: kGroup,
        taken: false
      };
      this.game.pickups.push({
        type: 'triage_key', x, z,
        label: 'DR. OKAFOR\'S TRIAGE KEY',
        mesh: kGroup,
        taken: false
      });
    }

    setObjectiveTarget(x, z, name, color = '#48cae4') {
      this.activeObjective = { x, z, name, color };
      document.getElementById('wpText').textContent = name;
      document.getElementById('wpText').style.borderColor = color;
      document.getElementById('compassObjectiveIcon').style.color = color;
      document.getElementById('compassObjectiveIcon').style.textShadow = `0 0 8px ${color}`;
    }

    update(dt) {
      const p = this.game.player;
      if (!p || !p.alive) return;

      const time = performance.now() * 0.001;

      // Animate floating items
      for (const b of this.beacons) {
        if (!b.taken && b.mesh) {
          b.mesh.rotation.y += dt * 1.5;
          b.mesh.position.y = b.baseY + Math.sin(time * 2.5) * 0.05;
        }
      }
      if (this.triageKeyItem && !this.triageKeyItem.taken && this.triageKeyItem.mesh) {
        this.triageKeyItem.mesh.rotation.y += dt * 1.2;
      }

      // Animate Triage Locker Door Opening
      if (this.triageLocker && this.triageLocker.opened && this.triageLocker.door.rotation.y > -Math.PI * 0.6) {
        this.triageLocker.door.rotation.y -= dt * 2.5;
      }

      if (!this.activeObjective) return;

      const targetVec = new THREE.Vector3(this.activeObjective.x, 1.2, this.activeObjective.z);
      const dist = p.pos.distanceTo(targetVec);

      // Update Compass & Waypoint
      this.updateCompass(p.yaw, targetVec, dist);
      this.updateWorldWaypoint(targetVec, dist);
    }

    updateCompass(playerYaw, targetVec, dist) {
      const pPos = this.game.player.pos;
      const dx = targetVec.x - pPos.x;
      const dz = targetVec.z - pPos.z;

      const targetAngle = Math.atan2(dx, dz);
      let angleDiff = targetAngle - playerYaw;

      while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
      while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

      const pct = 50 + (angleDiff / Math.PI) * 45;
      const icon = document.getElementById('compassObjectiveIcon');
      icon.style.left = `${Math.max(4, Math.min(96, pct))}%`;

      const distLabel = document.getElementById('compassDistanceLabel');
      distLabel.textContent = `SECTOR TARGET: ${this.activeObjective.name} [${Math.round(dist)}M]`;
    }

    updateWorldWaypoint(targetVec, dist) {
      const wp = document.getElementById('hudWorldWaypoint');
      const distEl = document.getElementById('wpDist');

      // Only display 3D world tag when within 18 meters to avoid visual clutter
      if (dist > 22) {
        wp.style.display = 'none';
        return;
      }

      const screenPos = targetVec.clone();
      screenPos.y += 0.5;
      screenPos.project(this.camera);

      if (screenPos.z > 1.0) {
        wp.style.display = 'none';
        return;
      }

      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      const x = (screenPos.x * halfW) + halfW;
      const y = (-(screenPos.y * halfH)) + halfH;

      wp.style.display = 'block';
      wp.style.left = `${x}px`;
      wp.style.top = `${y}px`;
      distEl.textContent = `${Math.round(dist)}M`;
    }

    get lockerMesh() {
      return this.triageLocker ? this.triageLocker.group : null;
    }

    get lockerUnlocked() {
      return this.triageLocker ? this.triageLocker.opened : false;
    }

    set lockerUnlocked(val) {
      if (this.triageLocker) this.triageLocker.opened = !!val;
    }

    spawnNurseLocker(scene) {
      if (!this.triageLocker) {
        this.buildTriageLocker();
      }
      return this.triageLocker;
    }

    spawnKeycardBeacon(x, z, type, label) {
      return this.spawnKeycardItem(x, z, type);
    }

    removeBeacon(type) {
      for (let i = this.beacons.length - 1; i >= 0; i--) {
        if (this.beacons[i].type === type) {
          if (this.beacons[i].mesh) this.scene.remove(this.beacons[i].mesh);
          this.beacons.splice(i, 1);
        }
      }
    }

    checkLockerInteraction(playerPos, playerInv, pushPopupFn, onKeycardSpawned) {
      if (!this.triageLocker) return 'none';
      if (this.triageLocker.opened) return 'already_open';

      const lPos = new THREE.Vector3(this.triageLocker.x, 0, this.triageLocker.z);
      if (playerPos.distanceTo(lPos) > 3.2) return 'too_far';

      if (!playerInv.triageKey) {
        if (pushPopupFn) pushPopupFn("LOCKER A-104 LOCKED — REQUIRES DR. OKAFOR'S TRIAGE KEY");
        return 'locked';
      }

      this.unlockTriageLocker();
      if (pushPopupFn) pushPopupFn("LOCKER A-104 UNLOCKED! REVEALED BLUE KEYCARD!");
      if (onKeycardSpawned && this.game && this.game.pickups) {
        const lastPickup = this.game.pickups[this.game.pickups.length - 1];
        if (lastPickup && lastPickup.type === 'key_blue') {
          onKeycardSpawned(lastPickup);
        }
      }
      return 'unlocked';
    }

    unlockTriageLocker() {
      if (this.triageLocker && !this.triageLocker.opened) {
        this.triageLocker.opened = true;
        this.triageLocker.screenMat.color.setHex(0x52f28b); // Green unlocked
        this.spawnKeycardItem(this.triageLocker.x, this.triageLocker.z + 0.2, 'key_blue');
      }
    }
  }

  window.ObjectiveTracker = ObjectiveTracker;
})(window);
