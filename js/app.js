"use strict";

// Инициализация Swiper
const mySwiper = new Swiper(".swiper-container", {
  loop: true,
  effect: "cube",
  cubeEffect: {
    slideShadows: true,
    shadow: true,
    shadowOffset: 20,
    shadowScale: 0.94,
  },
  speed: 800,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
});

// Анимация элементов при загрузке
const animateOnLoad = () => {
  const logo = document.querySelector(".header__logo");
  const social = document.querySelector(".header__social");
  const introContent = document.querySelector(".intro-content");

  if (logo) logo.classList.add("show");
  if (social) social.classList.add("show");
  if (introContent) introContent.classList.add("show");
};

// Анимация блока display-hp при прокрутке, один раз
const animateDisplayHpOnce = () => {
  const displayHp = document.querySelector(".display-hp");
  const image = document.querySelector(".display-hp__image");

  if (displayHp && image) {
    const rect = displayHp.getBoundingClientRect();
    if (
      rect.top < window.innerHeight &&
      rect.bottom >= 0 &&
      !image.classList.contains("visible")
    ) {
      image.classList.add("visible");
      window.removeEventListener("scroll", animateDisplayHpOnce); // Отключаем слушатель
    }
  }
};

// Анимация блока about-items при появлении в области видимости
const animateAboutItems = (entries, observer) => {
  const aboutBoxes = document.querySelectorAll(".about-item__box");
  const aboutPicture = document.querySelector(".about-item");

  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      aboutBoxes.forEach((box) => box.classList.add("visible"));
      if (aboutPicture) aboutPicture.classList.add("visible");
      observer.disconnect();
    }
  });
};

document.addEventListener("DOMContentLoaded", function () {
  // Запуск анимаций при загрузке
  animateOnLoad();

  // Анимация блока display-hp при первой прокрутке
  window.addEventListener("scroll", animateDisplayHpOnce);
  animateDisplayHpOnce();

  // Наблюдатель за блоком about-items
  const aboutItems = document.querySelector(".about-items");
  if (aboutItems) {
    const observerAbout = new IntersectionObserver(animateAboutItems, {
      threshold: 0.3,
    });
    observerAbout.observe(aboutItems);
  }

  // Прокрутка к секции "get" по нажатию на learnMoreButton
  const learnMoreButton = document.getElementById("learnMoreButton");
  if (learnMoreButton) {
    learnMoreButton.addEventListener("click", function () {
      const getSection = document.querySelector(".get");
      if (getSection) {
        getSection.scrollIntoView({
          behavior: "smooth",
          block: "start", // Начало секции прокрутится к верху экрана
        });
      }
    });
  }
});
