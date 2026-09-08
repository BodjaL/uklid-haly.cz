const menuButton = document.querySelector('.menu-button');
const nav = document.querySelector('#main-nav');
menuButton?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(open));
  menuButton.textContent = open ? 'Zavřít' : 'Menu';
});
nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton?.setAttribute('aria-expanded', 'false');
  if (menuButton) menuButton.textContent = 'Menu';
}));
document.querySelector('#year').textContent = new Date().getFullYear();
const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), { threshold: .12 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

const cookieBanner = document.querySelector('#cookie-banner');
const cookieSettings = document.querySelector('[data-cookie-settings]');
const consentKey = 'uklid-haly-cookie-consent';

function openCookieBanner() {
  if (!cookieBanner) return;
  cookieBanner.hidden = false;
  cookieBanner.querySelector('button')?.focus();
}

function saveCookieChoice(choice) {
  localStorage.setItem(consentKey, JSON.stringify({ choice, savedAt: new Date().toISOString() }));
  if (cookieBanner) cookieBanner.hidden = true;
}

if (!localStorage.getItem(consentKey)) openCookieBanner();
document.querySelectorAll('[data-cookie-choice]').forEach(button => {
  button.addEventListener('click', () => saveCookieChoice(button.dataset.cookieChoice));
});
cookieSettings?.addEventListener('click', openCookieBanner);
