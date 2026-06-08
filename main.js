// ================================
// WAVEFORM BUILDER
// ================================
function buildWaveform() {
  const waveform = document.getElementById('waveform');
  if (!waveform) return;
  const barCount = 32;
  for (let i = 0; i < barCount; i++) {
    const bar = document.createElement('div');
    bar.className = 'wf-bar' + (i > 8 && i < 20 ? ' active' : '');
    const h = Math.random() * 0.7 + 0.3;
    bar.style.height = (h * 36) + 'px';
    bar.style.animationDelay = (i * 0.04) + 's';
    bar.style.animationDuration = (0.8 + Math.random() * 0.8) + 's';
    waveform.appendChild(bar);
  }
}

// ================================
// TRACK DROPDOWN TOGGLE
// ================================
let openTrack = null;

function toggleTrack(idx) {
  const dropdown = document.getElementById('dropdown-' + idx);
  const chevron = document.getElementById('chevron-' + idx);
  if (!dropdown) return;

  const isOpen = dropdown.classList.contains('open');

  // Close any open dropdown first
  if (openTrack !== null && openTrack !== idx) {
    const prevDropdown = document.getElementById('dropdown-' + openTrack);
    const prevChevron = document.getElementById('chevron-' + openTrack);
    if (prevDropdown) prevDropdown.classList.remove('open');
    if (prevChevron) prevChevron.classList.remove('open');
  }

  // Toggle current
  dropdown.classList.toggle('open', !isOpen);
  chevron.classList.toggle('open', !isOpen);
  openTrack = isOpen ? null : idx;
}

// ================================
// HAMBURGER MENU
// ================================
function initHamburger() {
  const btn = document.getElementById('nav-hamburger');
  const drawer = document.getElementById('nav-drawer');
  if (!btn || !drawer) return;

  btn.addEventListener('click', () => {
    const isOpen = btn.classList.toggle('open');
    drawer.classList.toggle('open', isOpen);
  });

  drawer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      btn.classList.remove('open');
      drawer.classList.remove('open');
    });
  });
}

// ================================
// SCROLL FADE-UP
// ================================
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) entry.target.classList.add('visible');
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));
}

// ================================
// NAV ACTIVE STATE
// ================================
function initNavHighlight() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 100) current = s.id;
    });
    navLinks.forEach(a => {
      a.style.color = a.getAttribute('href').includes(current) && current
        ? 'var(--ocean-dark)' : '';
    });
  });
}

// ================================
// INIT
// ================================
document.addEventListener('DOMContentLoaded', () => {
  buildWaveform();
  initHamburger();
  initScrollAnimations();
  initNavHighlight();
});