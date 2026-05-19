const navToggle = document.querySelector('.nav-toggle');
const siteNav = document.querySelector('.site-nav');
const themeToggle = document.querySelector('.theme-toggle');
const form = document.getElementById('contact-form');
const responseMessage = document.getElementById('form-response');
const heroTitles = document.querySelectorAll('.hero-copy h1');

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem('theme', theme);
}

function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const theme = savedTheme || (prefersDark ? 'dark' : 'light');
  setTheme(theme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.dataset.theme || 'light';
  setTheme(currentTheme === 'dark' ? 'light' : 'dark');
}

if (themeToggle) {
  themeToggle.addEventListener('click', toggleTheme);
}

if (navToggle && siteNav) {
  navToggle.addEventListener('click', () => {
    siteNav.classList.toggle('open');
  });
}

function typeHeroText(element) {
  const text = element.textContent.trim();
  element.textContent = '';
  let index = 0;

  const interval = window.setInterval(() => {
    element.textContent += text[index] || '';
    index += 1;

    if (index >= text.length) {
      window.clearInterval(interval);
    }
  }, 55);
}

heroTitles.forEach(typeHeroText);

const revealTargets = document.querySelectorAll(
  'main section, .hero-card, .skill-card, .project-card, .about-card, .contact-info, .contact-form'
);

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.18 }
);

revealTargets.forEach((item) => {
  item.classList.add('animate-slide-up');
  revealObserver.observe(item);
});

const tiltCards = document.querySelectorAll('.project-card, .skill-card');

tiltCards.forEach((card) => {
  card.addEventListener('mousemove', (event) => {
    const rect = card.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * -12;
    card.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg) translateY(-4px)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const message = form.querySelector('#message').value.trim();

    if (!name || !email || !message) {
      responseMessage.textContent = 'Please fill in all fields before sending your message.';
      responseMessage.style.color = '#c56b97';
      return;
    }

    responseMessage.textContent = 'Thanks, your message has been sent! I’ll get back to you soon.';
    responseMessage.style.color = '#4a3b82';
    form.reset();
  });
}

initTheme();
