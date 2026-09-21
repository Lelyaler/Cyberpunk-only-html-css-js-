"use strict";

document.addEventListener("DOMContentLoaded", () => {
  if (typeof Swiper !== "undefined") {
    new Swiper(".swiper-container", {
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
        delay: 5000,
        disableOnInteraction: false,
      },
    });
  }

  const animateOnLoad = () => {
    const logo = document.querySelector(".header__logo");
    const social = document.querySelector(".header__social");
    const introContent = document.querySelector(".intro-content");

    if (logo) logo.classList.add("show");
    if (social) social.classList.add("show");
    if (introContent) introContent.classList.add("show");
  };

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
        window.removeEventListener("scroll", animateDisplayHpOnce);
      }
    }
  };

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

  const animateDrawImage = (entries, observer) => {
    const drawImage = document.querySelector(".image__info");

    entries.forEach((entry) => {
      if (entry.isIntersecting && drawImage) {
        drawImage.classList.add("visible");
        observer.disconnect();
      }
    });
  };

  animateOnLoad();

  window.addEventListener("scroll", animateDisplayHpOnce, { passive: true });
  animateDisplayHpOnce();

  const aboutItems = document.querySelector(".about-items");
  if (aboutItems) {
    const observerAbout = new IntersectionObserver(animateAboutItems, {
      threshold: 0.3,
    });
    observerAbout.observe(aboutItems);
  }

  const drawImage = document.querySelector(".image__info");
  if (drawImage) {
    const observerDraw = new IntersectionObserver(animateDrawImage, {
      threshold: 0.5,
    });
    observerDraw.observe(drawImage);
  }

  const learnMoreButton = document.getElementById("learnMoreButton");
  if (learnMoreButton) {
    learnMoreButton.addEventListener("click", () => {
      const getSection = document.querySelector(".get");
      if (getSection) {
        getSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  }
});
