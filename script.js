/* ANKIT CHAKRABORTTY — FIELD NOTES · behavior */

// ---- mobile plate toggle ----
const plate = document.getElementById('plate');
const plateToggle = document.getElementById('plateToggle');
const overlayClick = document.getElementById('overlayClick');

function openPlate(){ plate.classList.add('open'); }
function closePlate(){ plate.classList.remove('open'); }

plateToggle?.addEventListener('click', () => {
  plate.classList.contains('open') ? closePlate() : openPlate();
});
overlayClick?.addEventListener('click', closePlate);

document.querySelectorAll('.plate-nav a').forEach(a => {
  a.addEventListener('click', () => closePlate());
});

// ---- active nav link on scroll ----
const sections = document.querySelectorAll('.section[id]');
const navLinks = document.querySelectorAll('.plate-nav a');

const navObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });
    }
  });
}, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

sections.forEach(s => navObserver.observe(s));

// ---- reveal on scroll ----
const revealEls = document.querySelectorAll('.reveal-el');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
revealEls.forEach(el => revealObserver.observe(el));

// ---- circuit trace fill-in animation ----
const traceRows = document.querySelectorAll('.trace-row');
const traceObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('on');
      traceObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
traceRows.forEach(row => traceObserver.observe(row));
