/**
 * Viewport reveal observer and smooth navigation handlers.
 */

export function initScrollEffects() {
  const animatedElements = document.querySelectorAll(
    '.about-item__box, .about-item, .display-hp__image, .image__info'
  );

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    animatedElements.forEach((el) => observer.observe(el));
  } else {
    animatedElements.forEach((el) => el.classList.add('visible'));
  }

  // Header intro activation
  const logo = document.querySelector('.header__logo');
  const social = document.querySelector('.header__social');
  const introContent = document.querySelector('.intro-content');
  if (logo) logo.classList.add('show');
  if (social) social.classList.add('show');
  if (introContent) introContent.classList.add('show');

  // Smooth scroll buttons
  const learnMoreButton = document.getElementById('learnMoreButton');
  if (learnMoreButton) {
    learnMoreButton.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.getElementById('get');
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  const headerLogo = document.querySelector('.header__logo');
  if (headerLogo) {
    headerLogo.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
