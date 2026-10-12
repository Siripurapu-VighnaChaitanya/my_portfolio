/**
 * =====================================================================
 * 3D PORTFOLIO WEBSITE - CODEHAL INTERACTIVE SCRIPT
 * Controls: 3D Page Turn, Z-Index Layering, Contact Navigation & Opening
 * =====================================================================
 */

const pages = document.querySelectorAll('.book-page.page-right');
const pageTurnBtns = document.querySelectorAll('.nextprev-btn');

// Initial z-index stacking for right-side pages (front-most sheet on top)
pages.forEach((page, index) => {
  page.style.zIndex = 20 - index;
});

// Turn pages when clicking next or prev buttons
pageTurnBtns.forEach((el, index) => {
  el.onclick = (e) => {
    e.preventDefault();
    const pageTurnId = el.getAttribute('data-page');
    const pageTurn = document.getElementById(pageTurnId);
    const sheetIndex = Array.from(pages).indexOf(pageTurn);

    if (pageTurn.classList.contains('turn')) {
      pageTurn.classList.remove('turn');
      setTimeout(() => {
        pageTurn.style.zIndex = 20 - sheetIndex;
      }, 500);
    } else {
      pageTurn.classList.add('turn');
      setTimeout(() => {
        pageTurn.style.zIndex = 20 + sheetIndex;
      }, 500);
    }
  };
});

// Contact Me button on Profile page: Turns all pages to Contact page
const contactMeBtn = document.querySelector('#btn-contact-me');

if (contactMeBtn) {
  contactMeBtn.onclick = (e) => {
    e.preventDefault();
    pages.forEach((page, index) => {
      setTimeout(() => {
        page.classList.add('turn');
        setTimeout(() => {
          page.style.zIndex = 20 + index;
        }, 500);
      }, (index + 1) * 220);
    });
  };
}

// Back Profile button on Contact page: Returns smoothly to first spread (Page 1)
const backProfileBtn = document.querySelector('#back-profile-btn');

if (backProfileBtn) {
  backProfileBtn.onclick = (e) => {
    e.preventDefault();
    const total = pages.length;
    pages.forEach((_, index) => {
      const pageIndex = total - 1 - index;
      setTimeout(() => {
        pages[pageIndex].classList.remove('turn');
        setTimeout(() => {
          pages[pageIndex].style.zIndex = 20 - pageIndex;
        }, 500);
      }, (index + 1) * 220);
    });
  };
}

// Opening Animation on Page Load
const coverRight = document.querySelector('.cover.cover-right');

// Animate opening book right cover smoothly
setTimeout(() => {
  if (coverRight) {
    coverRight.classList.add('turn');
  }
}, 1800);

setTimeout(() => {
  if (coverRight) {
    coverRight.style.zIndex = -1;
  }
}, 2600);

// Opening animation for right-side pages (unfolding from right to left)
const total = pages.length;
pages.forEach((_, index) => {
  const pageIndex = total - 1 - index;
  setTimeout(() => {
    pages[pageIndex].classList.remove('turn');
    setTimeout(() => {
      pages[pageIndex].style.zIndex = 20 - pageIndex;
    }, 500);
  }, (index + 1) * 180 + 1900);
});

// Interactive Contact Form Feedback
const contactForm = document.getElementById('contact-form');
const formMsg = document.getElementById('form-msg');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('sender-name').value.trim();
    const email = document.getElementById('sender-email').value.trim();
    const msg = document.getElementById('message-text').value.trim();

    if (!name || !email || !msg) return;

    formMsg.textContent = 'Sending message...';
    formMsg.style.color = 'var(--main-color)';

    setTimeout(() => {
      formMsg.textContent = '✓ Message sent successfully! Thank you!';
      formMsg.style.color = '#10b981';
      contactForm.reset();

      setTimeout(() => {
        formMsg.textContent = '';
      }, 4000);
    }, 800);
  });
}

/**
 * =====================================================================
 * AMBIENT BACKGROUND PARTICLES
 * Lightweight animated neon particles & constellations behind the 3D book
 * =====================================================================
 */
const canvas = document.getElementById('particles-bg');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  const PARTICLE_COUNT = 38;

  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.45;
      this.radius = Math.random() * 1.8 + 0.8;
      this.alpha = Math.random() * 0.5 + 0.2;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > width) this.vx *= -1;
      if (this.y < 0 || this.y > height) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 171, 240, ${this.alpha})`;
      ctx.shadowBlur = 8;
      ctx.shadowColor = '#00abf0';
      ctx.fill();
      ctx.shadowBlur = 0;
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }

  function renderParticles() {
    ctx.clearRect(0, 0, width, height);

    // Subtle center radial ambient glow behind book
    const grad = ctx.createRadialGradient(width / 2, height / 2, 50, width / 2, height / 2, Math.max(width, height) * 0.6);
    grad.addColorStop(0, 'rgba(0, 171, 240, 0.08)');
    grad.addColorStop(0.5, 'rgba(0, 110, 154, 0.03)');
    grad.addColorStop(1, 'rgba(8, 27, 41, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, width, height);

    // Update & draw particles
    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw();

      // Connecting lines between nearby particles
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 171, 240, ${(1 - dist / 110) * 0.18})`;
          ctx.lineWidth = 0.7;
          ctx.stroke();
        }
      }
    }

    requestAnimationFrame(renderParticles);
  }

  renderParticles();
}
