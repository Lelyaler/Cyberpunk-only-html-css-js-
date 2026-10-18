/**
 * Swiper 3D Cube slider initialization for hero banner.
 */

export function initHeroSlider() {
  if (typeof Swiper === 'undefined') return;

  const container = document.querySelector('.swiper-container');
  if (!container) return;

  new Swiper('.swiper-container', {
    loop: true,
    effect: 'cube',
    cubeEffect: {
      slideShadows: true,
      shadow: true,
      shadowOffset: 20,
      shadowScale: 0.94
    },
    speed: 800,
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
}
