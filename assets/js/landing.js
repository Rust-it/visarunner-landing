/* VisaRunner landing behaviour — extracted verbatim from the production page's
   inline <script>: hamburger menu, scroll reveal, navbar shadow, billing toggle,
   hero stat counters. */

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  const open = navLinks.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', open ? 'true' : 'false');
});
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

// Scroll reveal
const reveals = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
reveals.forEach(el => io.observe(el));

// Navbar shadow on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.style.background = window.scrollY > 20
    ? 'rgba(11,17,32,0.97)'
    : 'rgba(11,17,32,0.85)';
});

// Billing toggle
function setBilling(mode) {
  const isYearly = mode === 'yearly';
  document.getElementById('btn-monthly').classList.toggle('active', !isYearly);
  document.getElementById('btn-yearly').classList.toggle('active', isYearly);
  document.getElementById('pricing').classList.toggle('is-yearly', isYearly);
}

// Animated counters in hero stats
function animateCount(el, target, suffix = '') {
  let start = 0;
  const duration = 1600;
  const step = (timestamp) => {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target) + suffix;
    if (progress < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

const statsObserver = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    const nums = document.querySelectorAll('.hero-stat-num');
    animateCount(nums[0], 5, '');
    animateCount(nums[1], 3, '');
    // nums[2] is "24/7" — static text, skip animation
    animateCount(nums[3], 14, '');
    statsObserver.disconnect();
  }
}, { threshold: 0.5 });
const statsEl = document.querySelector('.hero-stats');
if (statsEl) statsObserver.observe(statsEl);
