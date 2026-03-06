/* ============================================
   ANKIT CHAKRABORTTY — Portfolio JS
   Theme · Drawer · Scroll reveal · Active nav
   ============================================ */

// ── THEME ──
const html        = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const saved       = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', saved);

themeToggle.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
});

// ── DRAWER ──
const hamburger = document.getElementById('hamburger');
const drawer    = document.getElementById('drawer');
const overlay   = document.getElementById('overlay');

const openDrawer  = () => { drawer.classList.add('open'); overlay.classList.add('show'); hamburger.classList.add('open'); document.body.style.overflow = 'hidden'; };
const closeDrawer = () => { drawer.classList.remove('open'); overlay.classList.remove('show'); hamburger.classList.remove('open'); document.body.style.overflow = ''; };

hamburger.addEventListener('click', () => drawer.classList.contains('open') ? closeDrawer() : openDrawer());
overlay.addEventListener('click', closeDrawer);
document.querySelectorAll('.drawer-link').forEach(l => l.addEventListener('click', closeDrawer));

// ── SCROLL REVEAL ──
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); revealObs.unobserve(e.target); } });
}, { threshold: 0.08 });
revealEls.forEach(el => revealObs.observe(el));

// ── ACTIVE NAV ──
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const navObs   = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            navLinks.forEach(l => l.classList.remove('active'));
            const active = document.querySelector(`.nav-link[href="#${e.target.id}"]`);
            if (active) active.classList.add('active');
        }
    });
}, { rootMargin: '-45% 0px -50% 0px' });
sections.forEach(s => navObs.observe(s));

// ── NAVBAR BORDER ON SCROLL ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    navbar.style.borderBottomColor = window.scrollY > 8 ? 'var(--border)' : 'transparent';
}, { passive: true });