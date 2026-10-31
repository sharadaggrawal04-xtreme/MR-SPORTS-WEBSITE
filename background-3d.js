/**
 * MR SPORTS - 21ST.DEV HIGH-PERFORMANCE 3D BACKGROUND ENGINE
 * Optimized for 60 FPS on all devices (mobile, laptop, 4K)
 * Batched canvas draw calls (0 lag, 0 freeze)
 */

(function() {
  'use strict';

  const canvas = document.getElementById('bg-3d-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = 0;
  let height = 0;
  let dpr = 1;

  // Mouse & Scroll State
  const mouse = { x: 0, y: 0, targetX: 0, targetY: 0, screenX: -999, screenY: -999 };
  let scrollY = 0;
  let targetScrollY = 0;
  let scrollProgress = 0;
  let camRotX = 0;
  let camRotY = 0;
  let time = 0;
  let isVisible = true;

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 1.5); // Cap at 1.5 for optimal performance
    width = window.innerWidth || document.documentElement.clientWidth || 360;
    height = window.innerHeight || document.documentElement.clientHeight || 640;
    canvas.width = Math.max(1, Math.floor(width * dpr));
    canvas.height = Math.max(1, Math.floor(height * dpr));
    canvas.style.width = width + 'px';
    canvas.style.height = height + 'px';
    if (ctx.setTransform) {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    } else if (ctx.scale) {
      ctx.scale(dpr, dpr);
    }
  }

  window.addEventListener('resize', resize);
  resize();

  window.addEventListener('mousemove', function(e) {
    mouse.screenX = e.clientX;
    mouse.screenY = e.clientY;
    mouse.targetX = (e.clientX - width / 2);
    mouse.targetY = (e.clientY - height / 2);
  }, { passive: true });

  window.addEventListener('touchmove', function(e) {
    if (e.touches && e.touches[0]) {
      mouse.screenX = e.touches[0].clientX;
      mouse.screenY = e.touches[0].clientY;
      mouse.targetX = (e.touches[0].clientX - width / 2);
      mouse.targetY = (e.touches[0].clientY - height / 2);
    }
  }, { passive: true });

  window.addEventListener('scroll', function() {
    targetScrollY = window.pageYOffset || document.documentElement.scrollTop;
  }, { passive: true });

  document.addEventListener('visibilitychange', function() {
    isVisible = !document.hidden;
  });

  // -------------------------------------------------------------
  // 3D PERSPECTIVE MATH
  // -------------------------------------------------------------
  const FOV = 500;

  function project3D(x, y, z, cx, cy) {
    const cosY = Math.cos(camRotY);
    const sinY = Math.sin(camRotY);
    const cosX = Math.cos(camRotX);
    const sinX = Math.sin(camRotX);

    // Rotate Y
    const x1 = x * cosY - z * sinY;
    const z1 = z * cosY + x * sinY;

    // Rotate X
    const y1 = y * cosX - z1 * sinX;
    const z2 = z1 * cosX + y * sinX;

    const depth = z2 + FOV;
    if (depth <= 20 || depth > 2200) return null;

    const scale = FOV / depth;
    return {
      x: cx + x1 * scale,
      y: cy + y1 * scale,
      scale: scale,
      z: z2
    };
  }

  // -------------------------------------------------------------
  // 1. UNDULATING 3D PERSPECTIVE WAVE MESH (BATCHED 60 FPS)
  // -------------------------------------------------------------
  const waveCols = 22;
  const waveRows = 16;
  const waveStepX = 85;
  const waveStepZ = 80;
  const waveStartX = -(waveCols * waveStepX) / 2;
  const waveStartZ = -100;

  function draw3DWaveMesh(cx, cy) {
    const pts = [];
    const t = time * 0.02;

    for (let r = 0; r < waveRows; r++) {
      const rowPts = [];
      const z = waveStartZ + r * waveStepZ;
      for (let c = 0; c < waveCols; c++) {
        const x = waveStartX + c * waveStepX;
        let y = 390 + Math.sin(x * 0.003 + t) * 20 + Math.cos(z * 0.004 + t * 0.8) * 24;

        // Subtle mouse ripple
        const dx = (x - mouse.x * 1.1);
        const dz = (z - 200);
        const dist = Math.sqrt(dx * dx + dz * dz);
        if (dist < 280) {
          y -= Math.cos((dist / 280) * (Math.PI / 2)) * 35;
        }

        rowPts.push(project3D(x, y, z, cx, cy));
      }
      pts.push(rowPts);
    }

    // Batched Horizontal Lines
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
    ctx.beginPath();
    for (let r = 0; r < waveRows; r++) {
      let isFirst = true;
      for (let c = 0; c < waveCols; c++) {
        const p = pts[r][c];
        if (!p) continue;
        if (isFirst) { ctx.moveTo(p.x, p.y); isFirst = false; }
        else { ctx.lineTo(p.x, p.y); }
      }
    }
    ctx.stroke();

    // Batched Red Accent Lines
    ctx.strokeStyle = 'rgba(224, 30, 55, 0.18)';
    ctx.beginPath();
    for (let r = 0; r < waveRows; r += 4) {
      let isFirst = true;
      for (let c = 0; c < waveCols; c++) {
        const p = pts[r][c];
        if (!p) continue;
        if (isFirst) { ctx.moveTo(p.x, p.y); isFirst = false; }
        else { ctx.lineTo(p.x, p.y); }
      }
    }
    ctx.stroke();

    // Batched Longitudinal Lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
    ctx.beginPath();
    for (let c = 0; c < waveCols; c += 2) {
      let isFirst = true;
      for (let r = 0; r < waveRows; r++) {
        const p = pts[r][c];
        if (!p) continue;
        if (isFirst) { ctx.moveTo(p.x, p.y); isFirst = false; }
        else { ctx.lineTo(p.x, p.y); }
      }
    }
    ctx.stroke();

    // Batched Glowing Intersection Nodes
    ctx.fillStyle = 'rgba(255, 42, 75, 0.45)';
    ctx.beginPath();
    for (let r = 0; r < waveRows; r += 3) {
      for (let c = 0; c < waveCols; c += 3) {
        const p = pts[r][c];
        if (!p) continue;
        const radius = Math.max(0.8, 1.8 * p.scale);
        ctx.moveTo(p.x + radius, p.y);
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
      }
    }
    ctx.fill();
  }

  // -------------------------------------------------------------
  // 2. 3D MODELS (HERO, ABOUT, SERVICES, CONTACT)
  // -------------------------------------------------------------

  // Hero: Cricket Ball
  class CricketBallModel {
    constructor() {
      this.rotX = 0.3; this.rotY = 0; this.rotZ = 0.15;
      this.R = 135;
      this.rings = [];
      this.seam = [];
      const steps = 28;
      // Latitudes
      for (let lat = -50; lat <= 50; lat += 25) {
        const phi = (lat * Math.PI) / 180;
        const r = this.R * Math.cos(phi);
        const y = this.R * Math.sin(phi);
        const ring = [];
        for (let i = 0; i <= steps; i++) {
          const theta = (i / steps) * Math.PI * 2;
          ring.push({ x: r * Math.cos(theta), y: y, z: r * Math.sin(theta) });
        }
        this.rings.push(ring);
      }
      // Seam
      for (let i = 0; i <= 40; i++) {
        const theta = (i / 40) * Math.PI * 2;
        this.seam.push({
          x: (this.R + 2) * Math.cos(theta),
          y: Math.sin(theta * 10) * 2,
          z: (this.R + 2) * Math.sin(theta)
        });
      }
    }

    update() {
      this.rotX += 0.003;
      this.rotY += 0.005;
    }

    rotatePt(p) {
      let { x, y, z } = p;
      let y1 = y * Math.cos(this.rotX) - z * Math.sin(this.rotX);
      let z1 = z * Math.cos(this.rotX) + y * Math.sin(this.rotX);
      let x2 = x * Math.cos(this.rotY) - z1 * Math.sin(this.rotY);
      let z2 = z1 * Math.cos(this.rotY) + x * Math.sin(this.rotY);
      return { x: x2, y: y1, z: z2 };
    }

    draw(ctx, ox, oy, oz, opacity, cx, cy) {
      if (opacity <= 0.02) return;

      // Rings
      ctx.lineWidth = 1;
      ctx.strokeStyle = `rgba(255, 255, 255, ${0.05 * opacity})`;
      ctx.beginPath();
      this.rings.forEach(ring => {
        let first = true;
        ring.forEach(p => {
          const rp = this.rotatePt(p);
          const pr = project3D(ox + rp.x, oy + rp.y, oz + rp.z, cx, cy);
          if (!pr) return;
          if (first) { ctx.moveTo(pr.x, pr.y); first = false; }
          else { ctx.lineTo(pr.x, pr.y); }
        });
      });
      ctx.stroke();

      // Glowing Seam
      ctx.lineWidth = 2;
      ctx.strokeStyle = `rgba(224, 30, 55, ${0.85 * opacity})`;
      ctx.beginPath();
      let firstSeam = true;
      this.seam.forEach(p => {
        const rp = this.rotatePt(p);
        const pr = project3D(ox + rp.x, oy + rp.y, oz + rp.z, cx, cy);
        if (!pr) return;
        if (firstSeam) { ctx.moveTo(pr.x, pr.y); firstSeam = false; }
        else { ctx.lineTo(pr.x, pr.y); }
      });
      ctx.stroke();
    }
  }

  // About: Geodesic Icosahedron
  class IcosahedronModel {
    constructor(r) {
      this.r = r;
      this.rotX = 0; this.rotY = 0;
      const phi = (1 + Math.sqrt(5)) / 2;
      const raw = [
        [-1, phi, 0], [1, phi, 0], [-1, -phi, 0], [1, -phi, 0],
        [0, -1, phi], [0, 1, phi], [0, -1, -phi], [0, 1, -phi],
        [phi, 0, -1], [phi, 0, 1], [-phi, 0, -1], [-phi, 0, 1]
      ];
      this.verts = raw.map(v => {
        const len = Math.sqrt(v[0]*v[0] + v[1]*v[1] + v[2]*v[2]);
        return { x: (v[0]/len)*r, y: (v[1]/len)*r, z: (v[2]/len)*r };
      });
      this.edges = [
        [0,11],[0,5],[0,1],[0,7],[0,10],[1,5],[5,11],[11,10],[10,7],[7,1],
        [3,9],[3,4],[3,2],[3,6],[3,8],[4,9],[9,8],[8,6],[6,2],[2,4],
        [4,5],[5,9],[9,1],[1,8],[8,7],[7,6],[6,10],[10,2],[2,11],[11,4]
      ];
    }

    update() {
      this.rotX += 0.004;
      this.rotY += 0.006;
    }

    draw(ctx, ox, oy, oz, opacity, cx, cy) {
      if (opacity <= 0.02) return;
      const rot = this.verts.map(v => {
        let y1 = v.y * Math.cos(this.rotX) - v.z * Math.sin(this.rotX);
        let z1 = v.z * Math.cos(this.rotX) + v.y * Math.sin(this.rotX);
        let x2 = v.x * Math.cos(this.rotY) - z1 * Math.sin(this.rotY);
        let z2 = z1 * Math.cos(this.rotY) + v.x * Math.sin(this.rotY);
        return project3D(ox + x2, oy + y1, oz + z2, cx, cy);
      });

      ctx.lineWidth = 1.2;
      ctx.strokeStyle = `rgba(224, 30, 55, ${0.45 * opacity})`;
      ctx.beginPath();
      this.edges.forEach(([i, j]) => {
        const p1 = rot[i];
        const p2 = rot[j];
        if (p1 && p2) { ctx.moveTo(p1.x, p1.y); ctx.lineTo(p2.x, p2.y); }
      });
      ctx.stroke();
    }
  }

  // Services: Torus Ring
  class TorusModel {
    constructor(R, r) {
      this.R = R; this.r = r;
      this.rotX = 0.6; this.rotY = 0;
      this.rings = [];
      for (let v = 0; v < 16; v++) {
        const phi = (v / 16) * Math.PI * 2;
        const ring = [];
        for (let u = 0; u <= 12; u++) {
          const theta = (u / 12) * Math.PI * 2;
          ring.push({
            x: (R + r * Math.cos(theta)) * Math.cos(phi),
            y: (R + r * Math.cos(theta)) * Math.sin(phi),
            z: r * Math.sin(theta)
          });
        }
        this.rings.push(ring);
      }
    }

    update() {
      this.rotX += 0.005;
      this.rotY += 0.006;
    }

    draw(ctx, ox, oy, oz, opacity, cx, cy) {
      if (opacity <= 0.02) return;
      ctx.lineWidth = 1;
      this.rings.forEach((ring, idx) => {
        ctx.strokeStyle = (idx % 3 === 0) ? `rgba(224, 30, 55, ${0.45 * opacity})` : `rgba(255, 255, 255, ${0.07 * opacity})`;
        ctx.beginPath();
        let first = true;
        ring.forEach(p => {
          let y1 = p.y * Math.cos(this.rotX) - p.z * Math.sin(this.rotX);
          let z1 = p.z * Math.cos(this.rotX) + p.y * Math.sin(this.rotX);
          let x2 = p.x * Math.cos(this.rotY) - z1 * Math.sin(this.rotY);
          let z2 = z1 * Math.cos(this.rotY) + p.x * Math.sin(this.rotY);
          const pr = project3D(ox + x2, oy + y1, oz + z2, cx, cy);
          if (!pr) return;
          if (first) { ctx.moveTo(pr.x, pr.y); first = false; }
          else { ctx.lineTo(pr.x, pr.y); }
        });
        ctx.stroke();
      });
    }
  }

  // -------------------------------------------------------------
  // 3. 3D STELLAR PARTICLES (OPTIMIZED 45 PARTICLES)
  // -------------------------------------------------------------
  const PARTICLE_COUNT = 45;
  const particles = [];
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push({
      x: (Math.random() - 0.5) * 1600,
      y: (Math.random() - 0.5) * 2000,
      z: (Math.random() - 0.5) * 800,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      vz: (Math.random() - 0.5) * 0.35,
      r: Math.random() * 2 + 1,
      isRed: Math.random() > 0.7
    });
  }

  const cricketBall = new CricketBallModel();
  const icosahedron = new IcosahedronModel(110);
  const torus = new TorusModel(120, 32);

  // -------------------------------------------------------------
  // ANIMATION LOOP (LOCKED 60 FPS)
  // -------------------------------------------------------------
  function animate() {
    if (!isVisible) {
      requestAnimationFrame(animate);
      return;
    }
    time += 1;

    // Smooth inertia
    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;
    scrollY += (targetScrollY - scrollY) * 0.08;

    const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
    scrollProgress = Math.min(1, Math.max(0, scrollY / maxScroll));

    camRotY = (mouse.x / width) * 0.35;
    camRotX = -(mouse.y / height) * 0.25;

    ctx.clearRect(0, 0, width, height);

    const cx = width / 2;
    const cy = height / 2;

    // A. 21st.dev Cursor Spotlight
    if (mouse.screenX > 0 && mouse.screenY > 0) {
      const grad = ctx.createRadialGradient(
        mouse.screenX, mouse.screenY, 0,
        mouse.screenX, mouse.screenY, 400
      );
      grad.addColorStop(0, 'rgba(224, 30, 55, 0.05)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);
    }

    // B. 3D Wave Mesh
    draw3DWaveMesh(cx, cy);

    // C. Section Sculptures (Responsive: centered on mobile, offset on desktop)
    const isMobile = width < 768;
    const heroX = isMobile ? 0 : 350;
    const aboutX = isMobile ? 0 : -360;
    const servicesX = isMobile ? 0 : 360;
    const sculptureOpacity = isMobile ? 0.65 : 1.0;

    function getWeight(center, span) {
      const diff = Math.abs(scrollProgress - center);
      if (diff >= span) return 0;
      return Math.cos((diff / span) * (Math.PI / 2));
    }

    // Hero: Cricket Ball
    const wHero = getWeight(0.08, 0.22);
    if (wHero > 0.01) {
      cricketBall.update();
      cricketBall.draw(ctx, heroX, isMobile ? -90 : -60, isMobile ? 80 : 60, wHero * sculptureOpacity, cx, cy);
    }

    // About: Icosahedron
    const wAbout = getWeight(0.32, 0.22);
    if (wAbout > 0.01) {
      icosahedron.update();
      icosahedron.draw(ctx, aboutX, isMobile ? -30 : -20, isMobile ? 60 : 50, wAbout * sculptureOpacity, cx, cy);
    }

    // Services: Torus
    const wServices = getWeight(0.58, 0.22);
    if (wServices > 0.01) {
      torus.update();
      torus.draw(ctx, servicesX, isMobile ? -30 : -20, isMobile ? 50 : 40, wServices * sculptureOpacity, cx, cy);
    }

    // D. Batched Particles
    const projected = [];
    particles.forEach(p => {
      p.x += p.vx; p.y += p.vy; p.z += p.vz;
      if (p.x < -800) p.x = 800;
      if (p.x > 800) p.x = -800;
      if (p.y < -1000) p.y = 1000;
      if (p.y > 1000) p.y = -1000;
      if (p.z < -400) p.z = 400;
      if (p.z > 400) p.z = -400;

      const pr = project3D(p.x, p.y, p.z, cx, cy);
      if (pr) projected.push({ x: pr.x, y: pr.y, scale: pr.scale, r: p.r, isRed: p.isRed });
    });

    // Batched Particle Filaments
    ctx.lineWidth = 0.75;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.06)';
    ctx.beginPath();
    for (let i = 0; i < projected.length; i++) {
      for (let j = i + 1; j < projected.length; j++) {
        const dx = projected[i].x - projected[j].x;
        const dy = projected[i].y - projected[j].y;
        if (Math.abs(dx) < 70 && Math.abs(dy) < 70) {
          ctx.moveTo(projected[i].x, projected[i].y);
          ctx.lineTo(projected[j].x, projected[j].y);
        }
      }
    }
    ctx.stroke();

    // Batched Dots
    ctx.fillStyle = 'rgba(255, 42, 75, 0.55)';
    ctx.beginPath();
    projected.forEach(p => {
      if (p.isRed) {
        ctx.moveTo(p.x + p.r, p.y);
        ctx.arc(p.x, p.y, p.r * p.scale, 0, Math.PI * 2);
      }
    });
    ctx.fill();

    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.beginPath();
    projected.forEach(p => {
      if (!p.isRed) {
        ctx.moveTo(p.x + p.r, p.y);
        ctx.arc(p.x, p.y, p.r * p.scale, 0, Math.PI * 2);
      }
    });
    ctx.fill();

    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);

  // -------------------------------------------------------------
  // 4. CLEAN 3D CARD TILT (NO JITTER, NO SCRIPT CONFLICT)
  // -------------------------------------------------------------
  function setup3DCardTilt() {
    if (window.matchMedia('(hover: none)').matches) return;

    const cards = document.querySelectorAll('.dark-card');
    cards.forEach(card => {
      card.onmouseenter = function() {
        card.style.transition = 'transform 0.1s ease-out';
      };
      card.onmousemove = function(e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotX = -((y - rect.height / 2) / (rect.height / 2)) * 6;
        const rotY = ((x - rect.width / 2) / (rect.width / 2)) * 6;
        card.style.transform = `perspective(800px) rotateX(${rotX.toFixed(1)}deg) rotateY(${rotY.toFixed(1)}deg) translateZ(4px)`;
      };
      card.onmouseleave = function() {
        card.style.transition = 'transform 0.35s ease';
        card.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0)';
      };
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', setup3DCardTilt);
  } else {
    setup3DCardTilt();
  }

  window.init3DCardTilt = setup3DCardTilt;

})();
