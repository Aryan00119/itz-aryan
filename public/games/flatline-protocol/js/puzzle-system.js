/**
 * ST. AGNES MERCY: FLATLINE PROTOCOL 3D
 * Interactive Security Puzzles System (Keypad Gate Lock & Auxiliary Power Circuit Alignment)
 */

(function (window) {
  'use strict';

  class PuzzleSystem {
    constructor(game) {
      this.game = game;
      this.activePuzzle = null;
      this.gates = [];
      this.solvedPuzzles = new Set();
      this.createDOMModals();
    }

    createDOMModals() {
      // Keypad Modal HTML
      const keypadWrap = document.createElement('div');
      keypadWrap.id = 'puzzleKeypadModal';
      keypadWrap.className = 'overlay hidden';
      keypadWrap.innerHTML = `
        <div class="frame" style="max-width: 380px; text-align: center;">
          <div style="font-size: 11px; letter-spacing: 2px; color: var(--sick-bright); margin-bottom: 6px;">
            SECURE ACCESS TERMINAL — BIO-HAZARD LOCK
          </div>
          <div id="pkGateName" style="font-size: 16px; font-weight: bold; color: #fff; margin-bottom: 12px;">
            ISOLATION BLAST GATE
          </div>

          <!-- LCD Screen -->
          <div style="background: #080f0a; border: 2px solid #2e4a33; border-radius: 4px; padding: 12px; margin-bottom: 16px; box-shadow: inset 0 0 12px rgba(0,0,0,0.8);">
            <div style="font-size: 10px; color: #6d8f72; letter-spacing: 1px; margin-bottom: 4px;">STATUS: INPUT 4-DIGIT SECURITY CIPHER</div>
            <div id="pkDisplay" style="font-size: 32px; font-weight: bold; letter-spacing: 8px; color: #52f28b; font-family: monospace; min-height: 40px; line-height: 40px;">
              _ _ _ _
            </div>
            <div id="pkStatusMsg" style="font-size: 11px; color: #f4a261; height: 16px; margin-top: 4px;">ENTER CODE FOUND IN CLINICAL LOGS</div>
          </div>

          <!-- Keypad Grid -->
          <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; max-width: 260px; margin: 0 auto 16px;">
            <button class="pkBtn" data-val="1">1</button>
            <button class="pkBtn" data-val="2">2</button>
            <button class="pkBtn" data-val="3">3</button>
            <button class="pkBtn" data-val="4">4</button>
            <button class="pkBtn" data-val="5">5</button>
            <button class="pkBtn" data-val="6">6</button>
            <button class="pkBtn" data-val="7">7</button>
            <button class="pkBtn" data-val="8">8</button>
            <button class="pkBtn" data-val="9">9</button>
            <button class="pkBtn alt" data-val="clear" style="color:#e63946;">CLR</button>
            <button class="pkBtn" data-val="0">0</button>
            <button class="pkBtn alt" data-val="enter" style="color:#52f28b;">ENT</button>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span style="font-size:10px; color:#666;">CLUE: MEMO IN TRIAGE LOG</span>
            <button class="gbtn alt" id="pkCloseBtn" style="padding: 6px 14px; font-size: 11px;">CANCEL [ESC]</button>
          </div>
        </div>
      `;
      document.body.appendChild(keypadWrap);

      // Circuit Breaker Modal HTML
      const breakerWrap = document.createElement('div');
      breakerWrap.id = 'puzzleBreakerModal';
      breakerWrap.className = 'overlay hidden';
      breakerWrap.innerHTML = `
        <div class="frame" style="max-width: 440px; text-align: center;">
          <div style="font-size: 11px; letter-spacing: 2px; color: var(--amber); margin-bottom: 6px;">
            PRIMARY POWER RELAY — VOLTAGE BALANCING
          </div>
          <div id="pbTitle" style="font-size: 16px; font-weight: bold; color: #fff; margin-bottom: 12px;">
            DECONTAMINATION AIRLOCK POWER
          </div>

          <div style="background: #0d120e; border: 1px solid #3d4a3b; padding: 12px; margin-bottom: 14px;">
            <div style="display:flex; justify-content:space-between; font-size: 12px; margin-bottom: 8px;">
              <span>TARGET VOLTAGE: <b style="color:#52f28b;">100 V</b></span>
              <span>CURRENT SYSTEM: <b id="pbCurrentVal" style="color:#f4a261;">0 V</b></span>
            </div>
            <!-- Progress meter bar -->
            <div style="height: 14px; background: #1a221a; border: 1px solid #2f3d2f; position: relative; overflow: hidden; border-radius: 2px;">
              <div id="pbMeterFill" style="height:100%; width: 0%; background: linear-gradient(90deg, #f4a261, #52f28b); transition: width 0.2s ease-out;"></div>
            </div>
            <div id="pbMeterMsg" style="font-size: 10px; color:#888; margin-top: 6px;">Toggle switches to reach exactly 100V without overload.</div>
          </div>

          <!-- 4 Breaker switches -->
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; margin-bottom: 18px;">
            <div class="breakerCard" data-idx="0">
              <div class="bVal">+45V</div>
              <button class="bSwitch" id="bsw0">OFF</button>
              <div class="bLabel">RELAY 1</div>
            </div>
            <div class="breakerCard" data-idx="1">
              <div class="bVal">+25V</div>
              <button class="bSwitch" id="bsw1">OFF</button>
              <div class="bLabel">RELAY 2</div>
            </div>
            <div class="breakerCard" data-idx="2">
              <div class="bVal">+30V</div>
              <button class="bSwitch" id="bsw2">OFF</button>
              <div class="bLabel">RELAY 3</div>
            </div>
            <div class="breakerCard" data-idx="3">
              <div class="bVal">-15V</div>
              <button class="bSwitch" id="bsw3">OFF</button>
              <div class="bLabel">BYPASS</div>
            </div>
          </div>

          <div style="display:flex; justify-content:space-between; align-items:center;">
            <button class="gbtn" id="pbEngageBtn" style="padding: 8px 18px; font-size: 12px;">ENGAGE RELAY</button>
            <button class="gbtn alt" id="pbCloseBtn" style="padding: 6px 14px; font-size: 11px;">CANCEL [ESC]</button>
          </div>
        </div>
      `;
      document.body.appendChild(breakerWrap);

      // Inject Keypad & Breaker Styles
      const style = document.createElement('style');
      style.textContent = `
        .pkBtn {
          background: #18201a;
          border: 1px solid #384c3b;
          color: #d8e5d8;
          font-family: monospace;
          font-size: 18px;
          font-weight: bold;
          padding: 12px 0;
          cursor: pointer;
          border-radius: 4px;
          transition: all 0.08s ease-in-out;
        }
        .pkBtn:hover {
          background: #27382a;
          border-color: #52f28b;
          color: #fff;
        }
        .pkBtn:active {
          transform: scale(0.95);
          background: #39543e;
        }
        .breakerCard {
          background: #151b16;
          border: 1px solid #2a382d;
          padding: 10px 6px;
          border-radius: 4px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }
        .breakerCard .bVal {
          font-size: 13px;
          font-weight: bold;
          color: var(--amber);
        }
        .breakerCard .bLabel {
          font-size: 9px;
          color: #7b947e;
          letter-spacing: 1px;
        }
        .bSwitch {
          width: 100%;
          padding: 6px 0;
          font-size: 11px;
          font-weight: bold;
          font-family: monospace;
          background: #2a1c1c;
          border: 1px solid #e63946;
          color: #e63946;
          cursor: pointer;
          border-radius: 2px;
          transition: all 0.12s;
        }
        .bSwitch.on {
          background: #18331d;
          border-color: #52f28b;
          color: #52f28b;
        }
      `;
      document.head.appendChild(style);

      this.bindDOMEvents();
    }

    bindDOMEvents() {
      // Keypad Button Events
      const pkBtns = document.querySelectorAll('.pkBtn');
      pkBtns.forEach(b => {
        b.addEventListener('click', (e) => {
          e.stopPropagation();
          const val = b.getAttribute('data-val');
          this.handleKeypadInput(val);
        });
      });

      document.getElementById('pkCloseBtn').addEventListener('click', (e) => {
        e.stopPropagation();
        this.closeKeypadModal();
      });

      // Breaker Switch Events
      this.breakerSwitches = [false, false, false, false];
      this.breakerValues = [45, 25, 30, -15]; // Solution: 45 + 25 + 30 = 100! (Bypass 4 is false)

      for (let i = 0; i < 4; i++) {
        const btn = document.getElementById(`bsw${i}`);
        btn.addEventListener('click', (e) => {
          e.stopPropagation();
          this.toggleBreaker(i);
        });
      }

      document.getElementById('pbEngageBtn').addEventListener('click', (e) => {
        e.stopPropagation();
        this.checkBreakerSolution();
      });

      document.getElementById('pbCloseBtn').addEventListener('click', (e) => {
        e.stopPropagation();
        this.closeBreakerModal();
      });

      // Global Keydown for Modals
      window.addEventListener('keydown', (e) => {
        if (!this.activePuzzle) return;

        if (e.key === 'Escape') {
          if (this.activePuzzle.type === 'keypad') this.closeKeypadModal();
          else if (this.activePuzzle.type === 'breaker') this.closeBreakerModal();
          return;
        }

        if (this.activePuzzle.type === 'keypad') {
          if (e.key >= '0' && e.key <= '9') {
            this.handleKeypadInput(e.key);
          } else if (e.key === 'Backspace') {
            this.handleKeypadInput('clear');
          } else if (e.key === 'Enter') {
            this.handleKeypadInput('enter');
          }
        }
      });
    }

    /* ---------------- KEYPAD PUZZLE LOGIC ---------------- */
    openKeypadModal(gate) {
      this.activePuzzle = { type: 'keypad', gate, input: '' };
      this.game.paused = true;
      if (document.exitPointerLock) document.exitPointerLock();

      document.getElementById('pkGateName').textContent = gate.label || 'BIO-CONTAINMENT BLAST GATE';
      document.getElementById('pkDisplay').textContent = '_ _ _ _';
      document.getElementById('pkDisplay').style.color = '#52f28b';
      document.getElementById('pkStatusMsg').textContent = `CLUE: CHECK MEDICAL LOGS IN ADJACENT WING`;
      document.getElementById('puzzleKeypadModal').classList.remove('hidden');

      this.beepTone(620, 0.08);
    }

    closeKeypadModal() {
      document.getElementById('puzzleKeypadModal').classList.add('hidden');
      this.activePuzzle = null;
      this.game.paused = false;
    }

    handleKeypadInput(val) {
      if (!this.activePuzzle || this.activePuzzle.type !== 'keypad') return;

      const p = this.activePuzzle;
      const disp = document.getElementById('pkDisplay');
      const msg = document.getElementById('pkStatusMsg');

      if (val === 'clear') {
        p.input = '';
        disp.textContent = '_ _ _ _';
        disp.style.color = '#52f28b';
        msg.textContent = 'INPUT CLEARED';
        this.beepTone(320, 0.06);
        return;
      }

      if (val === 'enter') {
        this.validateKeypadCode();
        return;
      }

      if (p.input.length < 4) {
        p.input += val;
        let formatted = p.input.split('').join(' ');
        while (formatted.length < 7) formatted += ' _';
        disp.textContent = formatted;
        this.beepTone(880 + p.input.length * 60, 0.05);
      }
    }

    validateKeypadCode() {
      const p = this.activePuzzle;
      const disp = document.getElementById('pkDisplay');
      const msg = document.getElementById('pkStatusMsg');

      if (p.input.length < 4) {
        msg.textContent = 'ERROR: ENTER FULL 4-DIGIT CODE';
        this.beepTone(140, 0.18, 'sawtooth');
        return;
      }

      const correct = p.gate.code || '4815';

      if (p.input === correct) {
        disp.textContent = 'GRANTED';
        disp.style.color = '#52f28b';
        msg.textContent = 'AUTHORIZATION ACCEPTED — GATE UNLATCHING';
        this.beepTone(520, 0.1, 'sine');
        setTimeout(() => this.beepTone(880, 0.22, 'sine'), 100);

        this.solvedPuzzles.add(p.gate.id);
        this.openGate(p.gate);

        setTimeout(() => {
          this.closeKeypadModal();
          this.game.pushPopup(`CLEARANCE ACCEPTED: ${p.gate.label} OPEN`);
        }, 800);
      } else {
        disp.textContent = 'DENIED';
        disp.style.color = '#e63946';
        msg.textContent = 'ACCESS REJECTED — INVALID CREDENTIALS';
        this.beepTone(120, 0.28, 'sawtooth');

        setTimeout(() => {
          p.input = '';
          disp.textContent = '_ _ _ _';
          disp.style.color = '#52f28b';
          msg.textContent = 'ENTER 4-DIGIT SECURITY CIPHER';
        }, 900);
      }
    }

    /* ---------------- BREAKER PUZZLE LOGIC ---------------- */
    openBreakerModal(gate) {
      this.activePuzzle = { type: 'breaker', gate };
      this.game.paused = true;
      if (document.exitPointerLock) document.exitPointerLock();

      document.getElementById('pbTitle').textContent = gate.label || 'DECONTAMINATION AIRLOCK';
      this.updateBreakerUI();
      document.getElementById('puzzleBreakerModal').classList.remove('hidden');

      this.beepTone(440, 0.08);
    }

    closeBreakerModal() {
      document.getElementById('puzzleBreakerModal').classList.add('hidden');
      this.activePuzzle = null;
      this.game.paused = false;
    }

    toggleBreaker(idx) {
      this.breakerSwitches[idx] = !this.breakerSwitches[idx];
      const btn = document.getElementById(`bsw${idx}`);
      if (this.breakerSwitches[idx]) {
        btn.classList.add('on');
        btn.textContent = 'ON';
        this.beepTone(680, 0.05);
      } else {
        btn.classList.remove('on');
        btn.textContent = 'OFF';
        this.beepTone(320, 0.05);
      }
      this.updateBreakerUI();
    }

    updateBreakerUI() {
      let total = 0;
      for (let i = 0; i < 4; i++) {
        if (this.breakerSwitches[i]) total += this.breakerValues[i];
      }

      const curEl = document.getElementById('pbCurrentVal');
      curEl.textContent = `${total} V`;

      const fill = document.getElementById('pbMeterFill');
      const pct = Math.max(0, Math.min(100, (total / 100) * 100));
      fill.style.width = `${pct}%`;

      const msg = document.getElementById('pbMeterMsg');
      if (total === 100) {
        curEl.style.color = '#52f28b';
        msg.textContent = 'VOLTAGE BALANCED: 100V READY FOR RELAY ENGAGEMENT';
        msg.style.color = '#52f28b';
      } else if (total > 100) {
        curEl.style.color = '#e63946';
        msg.textContent = 'WARNING: CIRCUIT OVERLOAD! REDUCE LOAD.';
        msg.style.color = '#e63946';
      } else {
        curEl.style.color = '#f4a261';
        msg.textContent = 'INSUFFICIENT VOLTAGE: TOGGLE RELAYS TO REACH 100V';
        msg.style.color = '#f4a261';
      }
    }

    checkBreakerSolution() {
      let total = 0;
      for (let i = 0; i < 4; i++) {
        if (this.breakerSwitches[i]) total += this.breakerValues[i];
      }

      if (total === 100) {
        this.beepTone(580, 0.12);
        setTimeout(() => this.beepTone(880, 0.25), 120);

        const gate = this.activePuzzle.gate;
        this.solvedPuzzles.add(gate.id);
        this.openGate(gate);

        setTimeout(() => {
          this.closeBreakerModal();
          this.game.pushPopup(`POWER RESTORED: ${gate.label} ONLINE`);
        }, 700);
      } else {
        this.beepTone(110, 0.28, 'sawtooth');
      }
    }

    /* ---------------- PHYSICAL 3D GATE CREATION ---------------- */
    registerGate(gateDef) {
      const { id, x, z, w, d, h, type, code, label, openY = 4.2 } = gateDef;

      // 3D Gate Mesh
      const geo = new THREE.BoxGeometry(w, h, d);
      const canvas = document.createElement('canvas');
      canvas.width = 256; canvas.height = 512;
      const ctx = canvas.getContext('2d');
      ctx.fillStyle = '#161d18';
      ctx.fillRect(0, 0, 256, 512);

      // Warning hazard stripes
      ctx.fillStyle = '#d4af37';
      for (let y = 10; y < 120; y += 24) {
        ctx.beginPath();
        ctx.moveTo(0, y); ctx.lineTo(120, y + 60); ctx.lineTo(90, y + 60); ctx.lineTo(0, y + 15);
        ctx.fill();
      }
      ctx.strokeStyle = '#e63946';
      ctx.lineWidth = 6;
      ctx.strokeRect(8, 8, 240, 496);

      // Label
      ctx.fillStyle = '#e63946';
      ctx.font = 'bold 22px monospace';
      ctx.textAlign = 'center';
      ctx.fillText(label || 'SECURITY GATE', 128, 260);
      ctx.font = '16px monospace';
      ctx.fillText(type === 'keypad' ? 'CODE REQUIRED' : 'POWER OFFLINE', 128, 290);

      const tex = new THREE.CanvasTexture(canvas);
      const mat = new THREE.MeshStandardMaterial({ map: tex, roughness: 0.45, metalness: 0.3 });
      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.set(x, h / 2, z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      this.game.scene.add(mesh);

      // Interactive 3D Terminal Console beside gate
      const termGroup = new THREE.Group();
      const stand = new THREE.Mesh(new THREE.BoxGeometry(0.35, 1.1, 0.25), new THREE.MeshStandardMaterial({ color: 0x18201a }));
      const screen = new THREE.Mesh(new THREE.BoxGeometry(0.45, 0.32, 0.08), new THREE.MeshBasicMaterial({ color: type === 'keypad' ? 0x52f28b : 0xf4a261 }));
      screen.position.set(0, 0.38, 0.1);
      termGroup.add(stand, screen);

      // Place console 1.4m to side of gate
      const cx = (w > d) ? x + w / 2 + 0.6 : x + 0.6;
      const cz = (w > d) ? z + 0.6 : z + d / 2 + 0.6;
      termGroup.position.set(cx, 0.55, cz);
      this.game.scene.add(termGroup);

      const gateObj = {
        id, x, z, w, d, h, type, code, label,
        mesh, consoleMesh: termGroup,
        screenMesh: screen,
        open: false,
        targetY: h / 2,
        openTargetY: openY,
        collider: { minX: x - w / 2, maxX: x + w / 2, minZ: z - d / 2, maxZ: z + d / 2 }
      };

      this.gates.push(gateObj);
      this.game.colliders.push(gateObj.collider);
      return gateObj;
    }

    openGate(gate) {
      gate.open = true;
      gate.targetY = gate.openTargetY || 4.2;

      // Update terminal screen to green
      if (gate.screenMesh) {
        gate.screenMesh.material.color.setHex(0x52f28b);
      }

      // Remove collider
      const idx = this.game.colliders.indexOf(gate.collider);
      if (idx !== -1) this.game.colliders.splice(idx, 1);
    }

    update(dt) {
      // Smooth physical gate sliding animation
      for (const g of this.gates) {
        if (g.open && g.mesh.position.y < g.targetY) {
          g.mesh.position.y = THREE.MathUtils.lerp(g.mesh.position.y, g.targetY, dt * 3.5);
        }
      }
    }

    checkInteraction(playerPos) {
      for (const g of this.gates) {
        if (g.open) continue;
        const dist = playerPos.distanceTo(new THREE.Vector3(g.x, 1.2, g.z));
        if (dist < 3.2) {
          return {
            gate: g,
            label: g.type === 'keypad' ? `[E] ACCESS KEYPAD: ${g.label}` : `[E] ACCESS POWER RELAY: ${g.label}`
          };
        }
      }
      return null;
    }

    triggerInteraction(gate) {
      if (gate.type === 'keypad') {
        this.openKeypadModal(gate);
      } else if (gate.type === 'breaker') {
        this.openBreakerModal(gate);
      }
    }

    beepTone(freq, dur = 0.08, type = 'sine') {
      try {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (!AudioCtx) return;
        if (!this.actx) this.actx = new AudioCtx();
        if (this.actx.state === 'suspended') this.actx.resume();

        const osc = this.actx.createOscillator();
        const gain = this.actx.createGain();
        osc.type = type;
        osc.frequency.setValueAtTime(freq, this.actx.currentTime);
        gain.gain.setValueAtTime(0.2, this.actx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.actx.currentTime + dur);
        osc.connect(gain);
        gain.connect(this.actx.destination);
        osc.start();
        osc.stop(this.actx.currentTime + dur + 0.02);
      } catch (e) { }
    }
  }

  window.PuzzleSystem = PuzzleSystem;
})(window);
