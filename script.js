/* ============================================
   ANKIT CHAKRABORTTY — Portfolio JS
   ============================================ */

// === CUSTOM CURSOR ===
const cursor = document.getElementById('cursor');
const follower = document.getElementById('cursor-follower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

function animateFollower() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    requestAnimationFrame(animateFollower);
}
animateFollower();

// === HAMBURGER MENU ===
function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    const hamburger = document.getElementById('hamburger');
    menu.classList.toggle('open');
    hamburger.classList.toggle('open');
    document.body.style.overflow = menu.classList.contains('open') ? 'hidden' : '';
}

// === NAVBAR SCROLL ===
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// === REVEAL ON SCROLL ===
const revealSections = document.querySelectorAll('.reveal-section');
const skillGroups = document.querySelectorAll('.skill-group');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

revealSections.forEach(section => observer.observe(section));

// Skill bar observer
const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
        }
    });
}, { threshold: 0.3 });

skillGroups.forEach(group => skillObserver.observe(group));

// === ACTIVE NAV LINK ===
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === '#' + current) {
            link.style.color = 'var(--accent)';
        }
    });
});

// === SMOOTH CLOSE MOBILE MENU ON LINK CLICK ===
document.querySelectorAll('.mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
        const menu = document.getElementById('mobile-menu');
        const hamburger = document.getElementById('hamburger');
        menu.classList.remove('open');
        hamburger.classList.remove('open');
        document.body.style.overflow = '';
    });
});

// === HIDE CURSOR WHEN LEAVING WINDOW ===
document.addEventListener('mouseleave', () => {
    cursor.style.opacity = '0';
    follower.style.opacity = '0';
});
document.addEventListener('mouseenter', () => {
    cursor.style.opacity = '1';
    follower.style.opacity = '1';
});
