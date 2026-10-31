// High-Performance 60FPS Canvas Particle Physics Engine
// Realistic Cempasúchil Marigold Petals, Incense Smoke & Candle Light Glow

export class PetalSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.petals = [];
    this.smokeParticles = [];
    this.sparkles = [];
    this.width = 0;
    this.height = 0;
    this.mouse = { x: -1000, y: -1000, radius: 100 };
    this.wind = 0.4;
    this.windTarget = 0.4;
    this.isRunning = false;

    this.resize();
    window.addEventListener('resize', () => this.resize());

    // Mouse interactive trail
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      if (Math.random() > 0.6) {
        this.addSparkle(e.clientX, e.clientY);
      }
    });

    window.addEventListener('mouseleave', () => {
      this.mouse.x = -1000;
      this.mouse.y = -1000;
    });

    this.initPetals(55);
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  initPetals(count) {
    for (let i = 0; i < count; i++) {
      this.petals.push(this.createPetal(true));
    }
  }

  createPetal(randomY = false) {
    // Rich marigold colors: intense golden yellow, deep saffron, vivid orange, fiery red-orange
    const colors = [
      { r: 255, g: 158, b: 27 },   // Saffron orange
      { r: 255, g: 111, b: 0 },    // Marigold orange
      { r: 255, g: 183, b: 3 },    // Golden yellow
      { r: 232, g: 93, b: 4 },     // Rust orange
      { r: 244, g: 140, b: 6 }     // Bright cempasúchil
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];

    return {
      x: Math.random() * (this.width + 200) - 100,
      y: randomY ? Math.random() * this.height : -30 - Math.random() * 50,
      size: 9 + Math.random() * 11,
      aspect: 0.5 + Math.random() * 0.4,
      rotation: Math.random() * Math.PI * 2,
      rotationSpeed: (Math.random() - 0.5) * 0.04,
      flip: Math.random() * Math.PI,
      flipSpeed: 0.02 + Math.random() * 0.04,
      vy: 0.8 + Math.random() * 1.6,
      vx: 0.2 + Math.random() * 0.5,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.03 + Math.random() * 0.03,
      color: color,
      opacity: 0.75 + Math.random() * 0.25
    };
  }

  addSparkle(x, y) {
    this.sparkles.push({
      x: x + (Math.random() - 0.5) * 20,
      y: y + (Math.random() - 0.5) * 20,
      vx: (Math.random() - 0.5) * 1.5,
      vy: (Math.random() - 0.5) * 1.5 - 0.5,
      size: 2 + Math.random() * 3,
      alpha: 1,
      decay: 0.03 + Math.random() * 0.03
    });
  }

  burstPetals(count = 70, originX = null, originY = null) {
    const ox = originX ?? this.width / 2;
    const oy = originY ?? this.height * 0.3;

    for (let i = 0; i < count; i++) {
      const petal = this.createPetal(false);
      petal.x = ox + (Math.random() - 0.5) * 100;
      petal.y = oy + (Math.random() - 0.5) * 50;
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 6;
      petal.vx = Math.cos(angle) * speed;
      petal.vy = Math.sin(angle) * speed - 1;
      this.petals.push(petal);
    }
  }

  addCopalSmoke(x, y) {
    if (this.smokeParticles.length > 80) return;
    this.smokeParticles.push({
      x: x + (Math.random() - 0.5) * 12,
      y: y,
      vx: (Math.random() - 0.5) * 0.4 + this.wind * 0.2,
      vy: -0.6 - Math.random() * 0.8,
      size: 6 + Math.random() * 6,
      maxSize: 35 + Math.random() * 25,
      alpha: 0.35 + Math.random() * 0.2,
      rotation: Math.random() * Math.PI * 2,
      rotSpeed: (Math.random() - 0.5) * 0.015
    });
  }

  start() {
    this.isRunning = true;
    this.loop();
  }

  stop() {
    this.isRunning = false;
  }

  loop() {
    if (!this.isRunning) return;

    this.ctx.clearRect(0, 0, this.width, this.height);

    // Gently modulate wind
    if (Math.random() > 0.98) {
      this.windTarget = 0.2 + (Math.random() - 0.3) * 0.9;
    }
    this.wind += (this.windTarget - this.wind) * 0.01;

    // 1. Draw Copal Incense Smoke
    this.renderSmoke();

    // 2. Draw Golden Sparkles
    this.renderSparkles();

    // 3. Draw Cempasúchil Marigold Petals
    this.renderPetals();

    requestAnimationFrame(() => this.loop());
  }

  renderSmoke() {
    for (let i = this.smokeParticles.length - 1; i >= 0; i--) {
      const p = this.smokeParticles[i];
      p.x += p.vx + this.wind * 0.4;
      p.y += p.vy;
      p.size += (p.maxSize - p.size) * 0.015;
      p.alpha -= 0.003;
      p.rotation += p.rotSpeed;

      if (p.alpha <= 0 || p.y < -50) {
        this.smokeParticles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.rotation);

      const grad = this.ctx.createRadialGradient(0, 0, 0, 0, 0, p.size);
      grad.addColorStop(0, `rgba(240, 235, 220, ${p.alpha * 0.8})`);
      grad.addColorStop(0.5, `rgba(220, 215, 205, ${p.alpha * 0.4})`);
      grad.addColorStop(1, 'rgba(200, 195, 185, 0)');

      this.ctx.fillStyle = grad;
      this.ctx.beginPath();
      this.ctx.arc(0, 0, p.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.restore();
    }
  }

  renderSparkles() {
    for (let i = this.sparkles.length - 1; i >= 0; i--) {
      const s = this.sparkles[i];
      s.x += s.vx;
      s.y += s.vy;
      s.alpha -= s.decay;

      if (s.alpha <= 0) {
        this.sparkles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.beginPath();
      this.ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 215, 0, ${s.alpha})`;
      this.ctx.shadowColor = '#ffb703';
      this.ctx.shadowBlur = 8;
      this.ctx.fill();
      this.ctx.restore();
    }
  }

  renderPetals() {
    for (let i = 0; i < this.petals.length; i++) {
      const p = this.petals[i];

      // Physics update
      p.wobble += p.wobbleSpeed;
      p.rotation += p.rotationSpeed;
      p.flip += p.flipSpeed;

      p.x += p.vx + this.wind + Math.sin(p.wobble) * 0.8;
      p.y += p.vy;

      // Mouse repulsion / draft
      const dx = p.x - this.mouse.x;
      const dy = p.y - this.mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < this.mouse.radius) {
        const force = (1 - dist / this.mouse.radius) * 3;
        p.x += (dx / dist) * force;
        p.y += (dy / dist) * force;
      }

      // Wrap around bounds
      if (p.y > this.height + 40) {
        if (this.petals.length > 60) {
          this.petals.splice(i, 1);
          i--;
          continue;
        } else {
          this.petals[i] = this.createPetal(false);
          continue;
        }
      }
      if (p.x < -60) p.x = this.width + 40;
      if (p.x > this.width + 60) p.x = -40;

      // Draw stylized marigold petal (scalloped heart/teardrop shape)
      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate(p.rotation);
      this.ctx.scale(Math.cos(p.flip), 1);

      const w = p.size;
      const h = p.size * p.aspect;

      this.ctx.beginPath();
      this.ctx.moveTo(0, -h);
      this.ctx.bezierCurveTo(w * 0.8, -h * 0.8, w * 0.9, h * 0.3, 0, h);
      this.ctx.bezierCurveTo(-w * 0.9, h * 0.3, -w * 0.8, -h * 0.8, 0, -h);

      const grad = this.ctx.createLinearGradient(0, -h, 0, h);
      const c = p.color;
      grad.addColorStop(0, `rgba(${c.r}, ${c.g}, ${c.b}, ${p.opacity})`);
      grad.addColorStop(0.7, `rgba(${Math.min(255, c.r + 20)}, ${Math.max(0, c.g - 30)}, 0, ${p.opacity})`);
      grad.addColorStop(1, `rgba(${c.r * 0.7}, ${c.g * 0.4}, 0, ${p.opacity * 0.9})`);

      this.ctx.fillStyle = grad;
      this.ctx.shadowColor = `rgba(${c.r}, ${c.g}, ${c.b}, 0.5)`;
      this.ctx.shadowBlur = 6;
      this.ctx.fill();

      // Delicate petal center ridge
      this.ctx.beginPath();
      this.ctx.moveTo(0, -h * 0.8);
      this.ctx.lineTo(0, h * 0.6);
      this.ctx.strokeStyle = `rgba(255, 230, 150, ${p.opacity * 0.4})`;
      this.ctx.lineWidth = 1;
      this.ctx.stroke();

      this.ctx.restore();
    }
  }
}
