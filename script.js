const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
const themeToggle = document.querySelector('.theme-toggle');

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const lightMode = document.body.dataset.theme !== 'light';
    document.body.dataset.theme = lightMode ? 'light' : 'dark';
    themeToggle.setAttribute('aria-pressed', String(lightMode));
    themeToggle.setAttribute('aria-label', lightMode ? 'Ativar modo escuro' : 'Ativar modo claro');
    themeToggle.textContent = lightMode ? '☾' : '☼';
  });
}

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  });

  document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Abrir menu');
    });
  });

  document.addEventListener('click', event => {
    const clickedInsideNav = nav.contains(event.target);
    const clickedToggle = menuToggle.contains(event.target);
    if (!clickedInsideNav && !clickedToggle && nav.classList.contains('open')) {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuToggle.setAttribute('aria-label', 'Abrir menu');
    }
  });
}

const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in-view');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.section-label, .intro-content, .stats, .service-card, .manifesto-inner, .process-list article, .work, .contact-panel').forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

const backTop = document.querySelector('.back-top');
if (backTop) {
  window.addEventListener('scroll', () => backTop.classList.toggle('visible', window.scrollY > 500), { passive: true });
}

const counterObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    const el = entry.target;
    const target = Number(el.dataset.count);
    const start = performance.now();
    const duration = 1000;

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      el.textContent = Math.floor(target * (1 - Math.pow(1 - progress, 3))).toLocaleString('pt-PT');
      if (progress < 1) requestAnimationFrame(tick);
    }

    requestAnimationFrame(tick);
    counterObserver.unobserve(el);
  });
}, { threshold: .6 });

document.querySelectorAll('[data-count]').forEach(el => counterObserver.observe(el));

const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    const form = event.currentTarget;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const service = form.service.value;
    const message = form.message.value.trim();
    const body = `Olá, ADIN MIDIA!\n\nO meu nome é ${name}.\nContacto: ${email}.\nServiço: ${service}.\nProjecto: ${message || 'Gostaria de receber mais informações.'}`;
    const whatsappNumber = '244937667896';
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(body)}`, '_blank', 'noopener,noreferrer');
  });
}
