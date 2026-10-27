/**
 * Hero banner Swiper slider with smooth responsive transitions.
 */

export function initHeroSlider() {
  if (typeof Swiper === 'undefined') return;

  const container = document.querySelector('.swiper-container');
  if (!container) return;

  const swiper = new Swiper('.swiper-container', {
    loop: true,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },
    speed: 750,
    observer: true,
    observeParents: true,
    resizeObserver: true,
    watchOverflow: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
      pauseOnMouseEnter: true
    },
    keyboard: {
      enabled: true,
      onlyInViewport: true
    },
    grabCursor: true
  });

  window.addEventListener('resize', () => {
    if (swiper && !swiper.destroyed) {
      swiper.update();
    }
  });
}
