document.addEventListener('DOMContentLoaded', () => {
    console.log("Portfólio carregado com sucesso!");
  });
  
  function toggleMenu() {
  const navbar = document.getElementById('navbar');
  navbar.classList.toggle('active');
}

const canvas = document.getElementById('header-canvas');
const ctx = canvas.getContext('2d');
const header = document.querySelector('header');

function resizeCanvas() {
  canvas.width = header.offsetWidth;
  canvas.height = header.offsetHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Node {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
  }
  draw() {
    ctx.fillStyle = 'rgba(0,255,255,0.7)';
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI*2);
    ctx.fill();
  }
}

const nodes = [];
for (let i = 0; i < 50; i++) nodes.push(new Node());

function connectNodes() {
  for (let i = 0; i < nodes.length; i++) {
    for (let j = i+1; j < nodes.length; j++) {
      const dx = nodes[i].x - nodes[j].x;
      const dy = nodes[i].y - nodes[j].y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if (dist < 120) { 
        ctx.strokeStyle = `rgba(0,255,255,${1 - dist/120})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(nodes[i].x, nodes[i].y);
        ctx.lineTo(nodes[j].x, nodes[j].y);
        ctx.stroke();
      }
    }
  }
}

function animate() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  nodes.forEach(node => {
    node.update();
    node.draw();
  });
  connectNodes();
  requestAnimationFrame(animate);
}

animate();


const carousel = document.querySelector('.skills-carousel');
let scrollAmount = 0;

function autoScroll() {
  scrollAmount += 1;
  if (scrollAmount >= carousel.scrollWidth - carousel.clientWidth) {
    scrollAmount = 0;
  }
  carousel.scrollLeft = scrollAmount;
  requestAnimationFrame(autoScroll);
}

autoScroll();
