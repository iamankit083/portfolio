/* ============================================
   ANKIT CHAKRABORTTY — Portfolio JS v2
   Theme · Cursor · Drawer · Reveal · Terminal
   ============================================ */

// ── THEME ──
const html        = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');
const saved       = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', saved);

themeToggle.addEventListener('click', () => {
    const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
});

// ── CUSTOM CURSOR ──
const cursor      = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursor-trail');
let mouseX = 0, mouseY = 0, trailX = 0, trailY = 0;

document.addEventListener('mousemove', e => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top  = mouseY + 'px';
});

(function animateTrail() {
    trailX += (mouseX - trailX) * 0.12;
    trailY += (mouseY - trailY) * 0.12;
    cursorTrail.style.left = trailX + 'px';
    cursorTrail.style.top  = trailY + 'px';
    requestAnimationFrame(animateTrail);
})();

// Grow cursor on interactive elements
document.querySelectorAll('a, button').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%,-50%) scale(2)';
        cursorTrail.style.opacity = '.15';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%,-50%) scale(1)';
        cursorTrail.style.opacity = '.4';
    });
});

// ── DRAWER ──
const hamburger  = document.getElementById('hamburger');
const drawer     = document.getElementById('drawer');
const overlay    = document.getElementById('overlay');
const drawerClose= document.getElementById('drawer-close');

const openDrawer  = () => {
    drawer.classList.add('open');
    overlay.classList.add('show');
    hamburger.classList.add('open');
    document.body.style.overflow = 'hidden';
};
const closeDrawer = () => {
    drawer.classList.remove('open');
    overlay.classList.remove('show');
    hamburger.classList.remove('open');
    document.body.style.overflow = '';
};

hamburger.addEventListener('click', () => drawer.classList.contains('open') ? closeDrawer() : openDrawer());
overlay.addEventListener('click', closeDrawer);
drawerClose.addEventListener('click', closeDrawer);
document.querySelectorAll('.drawer-link').forEach(l => l.addEventListener('click', closeDrawer));

// ── SCROLL REVEAL ──
const revealEls = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (e.isIntersecting) {
            e.target.classList.add('visible');
            revealObs.unobserve(e.target);
        }
    });
}, { threshold: 0.07 });
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

// ── TERMINAL TYPEWRITER ──
const commands = [
    'whoami',
    'cat about.txt',
    'g++ -o hello hello.cpp && ./hello',
    'ls -la ~/projects/',
    'sudo apt upgrade skills',
    'git commit -m "keep learning"',
    'vim main.cpp',
];
let cmdIdx = 0, charIdx = 0, typing = true;
const cmdEl = document.getElementById('typed-cmd');

function typeLoop() {
    const cmd = commands[cmdIdx];
    if (typing) {
        if (charIdx <= cmd.length) {
            cmdEl.textContent = cmd.slice(0, charIdx++);
            setTimeout(typeLoop, 60 + Math.random() * 40);
        } else {
            typing = false;
            setTimeout(typeLoop, 1800);
        }
    } else {
        if (charIdx > 0) {
            cmdEl.textContent = cmd.slice(0, --charIdx);
            setTimeout(typeLoop, 28);
        } else {
            typing = true;
            cmdIdx = (cmdIdx + 1) % commands.length;
            setTimeout(typeLoop, 400);
        }
    }
}
setTimeout(typeLoop, 800);