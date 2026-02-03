const fwCanvas = document.getElementById('fireworks');
const fwCtx = fwCanvas.getContext('2d');

fwCanvas.width = window.innerWidth;
fwCanvas.height = window.innerHeight;

window.addEventListener('resize', () => {
  fwCanvas.width = window.innerWidth;
  fwCanvas.height = window.innerHeight;
});

class Firework {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.particles = [];
    this.createParticles();
  }

  createParticles() {
    const colors = ['#ffffff', '#fffc00', '#ff5733', '#33ffbd'];
    for (let i = 0; i < 50; i++) {
      this.particles.push({
        x: this.x,
        y: this.y,
        vx: (Math.random() - 0.5) * 6,
        vy: (Math.random() - 0.5) * 6,
        alpha: 1,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
  }

  update() {
    this.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.02;
    });
    this.particles = this.particles.filter(p => p.alpha > 0);
  }

  draw(ctx) {
    this.particles.forEach(p => {
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }

  isDone() {
    return this.particles.length === 0;
  }
}

let fireworks = [];

function animate() {
  fwCtx.clearRect(0, 0, fwCanvas.width, fwCanvas.height);

  if (Math.random() < 0.05) {
    fireworks.push(new Firework(Math.random() * fwCanvas.width, Math.random() * fwCanvas.height));
  }

  fireworks.forEach(fw => {
    fw.update();
    fw.draw(fwCtx);
  });

  fireworks = fireworks.filter(fw => !fw.isDone());

  requestAnimationFrame(animate);
}

animate();
