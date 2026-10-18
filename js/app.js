/**
 * Cyberpunk 2077 Promo
 * Main frontend application controller
 */

import { initHeroSlider } from './modules/slider.js';
import { initModals } from './modules/modals.js';
import { initPlatformSelector } from './modules/platforms.js';
import { initRaffleForm } from './modules/form.js';
import { initScrollEffects } from './modules/scroll.js';

document.addEventListener('DOMContentLoaded', () => {
  initHeroSlider();

  const { openModal } = initModals();

  initPlatformSelector();

  initRaffleForm(openModal);

  initScrollEffects();
});
