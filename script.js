/* ═══════════════════════════════
   JOHN SALAZAR — CYBERPUNK JS
   ═══════════════════════════════ */

/* ── BOOT SEQUENCE ── */
document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(e.target);

  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    subject: formData.get("subject"),
    message: formData.get("message"),
  };

  try {
    const res = await fetch("/api/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await res.json().catch(() => ({}));

    if (res.ok) {
      alert("✓ Message sent!");
      console.log("SUCCESS:", result);
      e.target.reset();
    } else {
      console.log("ERROR RESPONSE:", result);
      alert("✗ Failed: " + (result.error?.message || result.error));
    }

  } catch (err) {
    console.error("NETWORK ERROR:", err);
    alert("✗ Network error (check API)");
  }
});
const bootLines = [
  'INITIALIZING KERNEL... OK',
  'LOADING NEURAL INTERFACE... OK',
  'MOUNTING SKILL_MATRIX.sys... OK',
  'CONNECTING TO NODE: PHL-ILO... OK',
  'DECRYPTING AGENT_PROFILE.dat... OK',
  'SCANNING THREAT LEVEL... CLEAR',
  'BOOTING PORTFOLIO v2.0... READY',
];

const bootEl = document.getElementById('bootLines');
const bootBar = document.getElementById('bootBar');
const bootPct = document.getElementById('bootPct');
const bootScreen = document.getElementById('boot-screen');

let lineIdx = 0;
function runBoot() {
  if (lineIdx < bootLines.length) {
    const d = document.createElement('div');
    d.textContent = '> ' + bootLines[lineIdx];
    bootEl.appendChild(d);
    lineIdx++;
    const pct = Math.round((lineIdx / bootLines.length) * 100);
    bootBar.style.width = pct + '%';
    bootPct.textContent = pct + '%';
    setTimeout(runBoot, 200 + Math.random() * 150);
  } else {
    setTimeout(() => {
      bootScreen.classList.add('hidden');
    }, 500);
  }
}
setTimeout(runBoot, 300);

/* ── MATRIX CANVAS ── */
const canvas = document.getElementById('matrix-bg');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

const cols = Math.floor(window.innerWidth / 20);
const drops = Array(cols).fill(1);
const chars = 'アイウエオカキクケコサシスセソタチツテト01アBCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*';

function drawMatrix() {
  ctx.fillStyle = 'rgba(2,4,8,0.05)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = '#00fff5';
  ctx.font = '14px Share Tech Mono';

  drops.forEach((y, i) => {
    const ch = chars[Math.floor(Math.random() * chars.length)];
    ctx.fillStyle = `rgba(0,255,245,${Math.random() * 0.5 + 0.1})`;
    ctx.fillText(ch, i * 20, y * 20);
    if (y * 20 > canvas.height && Math.random() > 0.975) drops[i] = 0;
    drops[i]++;
  });
}
setInterval(drawMatrix, 60);

/* ── CUSTOM CURSOR ── */
const cursor = document.getElementById('cyber-cursor');
const ccOuter = cursor.querySelector('.cc-outer');
const ccCross = cursor.querySelector('.cc-cross');
const ccDot = cursor.querySelector('.cc-dot');
let mx = 0, my = 0, ox = 0, oy = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  ccDot.style.left = mx + 'px'; ccDot.style.top = my + 'px';
  ccCross.style.left = mx + 'px'; ccCross.style.top = my + 'px';
});
(function animOuter() {
  ox += (mx - ox) * 0.14; oy += (my - oy) * 0.14;
  ccOuter.style.left = ox + 'px'; ccOuter.style.top = oy + 'px';
  requestAnimationFrame(animOuter);
})();

/* ── CLOCK HUD ── */
const clockEl = document.getElementById('clock-hud');
function updateClock() {
  if (!clockEl) return;
  const now = new Date();
  clockEl.textContent = now.toTimeString().slice(0, 8);
}
updateClock();
setInterval(updateClock, 1000);

/* ── PROGRESS BAR + NAV ── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  const pct = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
  document.getElementById('progress-bar').style.width = pct + '%';
});

/* ── MOBILE MENU ── */
const mobileMenu = document.getElementById('mobileMenu');
document.getElementById('hamburger').addEventListener('click', () => mobileMenu.classList.add('open'));
document.getElementById('mobileClose').addEventListener('click', () => mobileMenu.classList.remove('open'));
function closeMobile() { mobileMenu.classList.remove('open'); }

/* ── TYPEWRITER ── */
const phrases = [
  'Freelance Developer',
  'Web Developer',
  'PHP Developer',
  'Game Developer',
  'Problem Solver',
  'UI/UX Craftsman',
];
let pi = 0, ci = 0, deleting = false;
const twEl = document.getElementById('typewriter');
function typeLoop() {
  const cur = phrases[pi];
  if (!deleting) {
    twEl.textContent = cur.slice(0, ++ci);
    if (ci === cur.length) { deleting = true; setTimeout(typeLoop, 2000); return; }
  } else {
    twEl.textContent = cur.slice(0, --ci);
    if (ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; }
  }
  setTimeout(typeLoop, deleting ? 40 : 80);
}
typeLoop();

/* ── SCROLL REVEAL ── */
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    el.classList.add('revealed');

    // Animate skill bar fills
    const fill = el.querySelector('.sc-bar-fill');
    if (fill) {
      const level = el.dataset.level || fill.dataset.level;
      fill.style.setProperty('--w', level);
      fill.style.width = level + '%';
    }

    revealObs.unobserve(el);
  });
}, { threshold: 0.15 });

document.querySelectorAll('[data-reveal]').forEach(el => revealObs.observe(el));

/* Stagger project cards */
document.querySelectorAll('.project-card').forEach((card, i) => {
  card.style.transitionDelay = (i * 0.1) + 's';
});

/* ── COUNTER ANIMATION ── */
function animCount(el, target, suffix, duration = 1200) {
  let start = 0;
  const step = (timestamp) => {
    if (!step.startTime) step.startTime = timestamp;
    const progress = Math.min((timestamp - step.startTime) / duration, 1);
    el.textContent = Math.floor(progress * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statsObs = new IntersectionObserver((entries) => {
  if (!entries[0].isIntersecting) return;
  animCount(document.getElementById('proj-count'), 20, '+');
  animCount(document.getElementById('yr-count'), 4, '+');
  statsObs.disconnect();
}, { threshold: 0.3 });
const statCard = document.querySelector('.skill-stat-card');
if (statCard) statsObs.observe(statCard);

/* ── FORM SUBMIT ── */
function handleSubmit(e) {
  e.preventDefault();
  const btn = document.getElementById('submitText');
  btn.textContent = 'TRANSMITTING...';

  // Simulate sending
  const chars = '!@#$%^&*<>?/\\|{}[]~`';
  let count = 0;
  const scramble = setInterval(() => {
    btn.textContent = Array.from({length: 18}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
    if (++count > 10) {
      clearInterval(scramble);
      btn.textContent = 'TRANSMIT_MESSAGE.exe';
      const fb = document.getElementById('cfSuccess');
      fb.style.display = 'block';
      e.target.reset();
      setTimeout(() => { fb.style.display = 'none'; }, 5000);
    }
  }, 80);
}

/* ── SMOOTH SCROLL NAV ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* ── GLITCH HOVER ON NAV LINKS ── */
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('mouseenter', () => {
    link.style.animation = 'none';
    requestAnimationFrame(() => {
      link.style.animation = '';
    });
  });
});

/* ── CARD TILT EFFECT ── */
document.querySelectorAll('.project-card, .skill-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotX = -(y / rect.height) * 6;
    const rotY = (x / rect.width) * 6;
    card.style.transform = `translateY(-4px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
    card.style.perspective = '600px';
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
    card.style.perspective = '';
  });
});
