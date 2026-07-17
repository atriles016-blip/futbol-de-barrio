// Menú hamburguesa para mobile
const navToggle = document.getElementById('navToggle');
const formationNav = document.getElementById('formationNav');

navToggle.addEventListener('click', () => {
  const isOpen = formationNav.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

formationNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    formationNav.classList.remove('is-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// Animación de aparición al hacer scroll
const revealTargets = document.querySelectorAll('.section, .hero-content');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealTargets.forEach(el => revealObserver.observe(el));

// Marcador tipo scoreboard: cuenta hacia arriba cuando entra en pantalla
const scoreValues = document.querySelectorAll('.score-value');

const countUp = (el) => {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1200;
  const start = performance.now();

  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    el.textContent = Math.floor(progress * target);
    if (progress < 1) {
      requestAnimationFrame(step);
    } else {
      el.textContent = target;
    }
  };
  requestAnimationFrame(step);
};

const scoreObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      countUp(entry.target);
      scoreObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

scoreValues.forEach(el => scoreObserver.observe(el));

// Formulario de práctica: evita el envío real y avisa al usuario
const joinForm = document.querySelector('.join-form');
if (joinForm) {
  joinForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = joinForm.querySelector('#nombre').value || 'crack';
    alert(`Gracias, ${nombre}. Este formulario es solo de práctica para la escuela, todavía no envía datos a ningún lado.`);
    joinForm.reset();
  });
}
