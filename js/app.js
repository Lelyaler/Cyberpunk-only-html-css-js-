"use strict";

document.addEventListener("DOMContentLoaded", () => {
  // Инициализация слайдера Swiper
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
        pauseOnMouseEnter: true,
      },
      keyboard: {
        enabled: true,
        onlyInViewport: true,
      },
      grabCursor: true,
    });
  }

  // Анимация появления первого экрана
  const animateOnLoad = () => {
    const logo = document.querySelector(".header__logo");
    const social = document.querySelector(".header__social");
    const introContent = document.querySelector(".intro-content");

    if (logo) logo.classList.add("show");
    if (social) social.classList.add("show");
    if (introContent) introContent.classList.add("show");
  };
  animateOnLoad();

  // Плавное появление элементов при скролле
  const animatedElements = document.querySelectorAll(
    ".about-item__box, .about-item, .display-hp__image, .image__info"
  );

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    animatedElements.forEach((el) => revealObserver.observe(el));
  } else {
    animatedElements.forEach((el) => el.classList.add("visible"));
  }

  // Плавный скролл по кнопке "Узнать больше"
  const learnMoreButton = document.getElementById("learnMoreButton");
  if (learnMoreButton) {
    learnMoreButton.addEventListener("click", (e) => {
      e.preventDefault();
      const getSection = document.getElementById("get");
      if (getSection) {
        getSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  }

  // Скролл наверх по клику на логотип
  const headerLogo = document.querySelector(".header__logo");
  if (headerLogo) {
    headerLogo.addEventListener("click", (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  }

  // Управление модальными окнами
  const openModal = (modalId) => {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.hidden = false;
    requestAnimationFrame(() => {
      modal.classList.add("is-open");
    });
    document.body.style.overflow = "hidden";
  };

  const closeModal = (modal) => {
    if (!modal) return;
    modal.classList.remove("is-open");
    setTimeout(() => {
      modal.hidden = true;
      if (!document.querySelector(".cyber-modal.is-open")) {
        document.body.style.overflow = "";
      }
    }, 300);
  };

  document.querySelectorAll("[data-modal-close]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const modal = btn.closest(".cyber-modal");
      closeModal(modal);
    });
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      const activeModal = document.querySelector(".cyber-modal.is-open");
      if (activeModal) closeModal(activeModal);
    }
  });

  // Триггеры модальных окон
  const hpDetailsBtn = document.getElementById("hpDetailsBtn");
  if (hpDetailsBtn) {
    hpDetailsBtn.addEventListener("click", () => openModal("hpModal"));
  }

  const licenseBtn = document.getElementById("licenseBtn");
  if (licenseBtn) {
    licenseBtn.addEventListener("click", () => openModal("licenseModal"));
  }

  const privacyBtn = document.getElementById("privacyBtn");
  if (privacyBtn) {
    privacyBtn.addEventListener("click", () => openModal("privacyModal"));
  }

  // Интерактивный выбор платформы
  const platformItems = document.querySelectorAll(".get-platform__list");
  const platformLabel = document.getElementById("selectedPlatformLabel");

  platformItems.forEach((item) => {
    const selectPlatform = () => {
      platformItems.forEach((p) => {
        p.classList.remove("is-active");
        p.setAttribute("aria-checked", "false");
      });
      item.classList.add("is-active");
      item.setAttribute("aria-checked", "true");
      const platformName = item.getAttribute("data-platform");
      if (platformLabel && platformName) {
        platformLabel.textContent = platformName;
      }
    };

    item.addEventListener("click", selectPlatform);
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        selectPlatform();
      }
    });
  });

  // Отображение имени прикрепленного файла
  const fileInput = document.getElementById("file-upload");
  const fileLabelText = document.getElementById("fileUploadText");
  const formLabel = document.querySelector(".form-label");

  if (fileInput && fileLabelText) {
    fileInput.addEventListener("change", () => {
      if (fileInput.files && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
        fileLabelText.textContent = `${file.name} (${sizeMb} МБ)`;
        if (formLabel) formLabel.classList.add("has-file");
      } else {
        fileLabelText.textContent = "Прикрепить скриншот";
        if (formLabel) formLabel.classList.remove("has-file");
      }
    });
  }

  // Валидация и отправка формы розыгрыша
  const drawForm = document.getElementById("drawForm");
  const drawName = document.getElementById("drawName");
  const drawEmail = document.getElementById("drawEmail");
  const nameError = document.getElementById("nameError");
  const emailError = document.getElementById("emailError");
  const agreementCheckbox = document.getElementById("agreementCheckbox");

  const clearFormErrors = () => {
    if (drawName) drawName.classList.remove("is-invalid");
    if (drawEmail) drawEmail.classList.remove("is-invalid");
    if (nameError) nameError.textContent = "";
    if (emailError) emailError.textContent = "";
  };

  if (drawName) {
    drawName.addEventListener("input", () => {
      drawName.classList.remove("is-invalid");
      if (nameError) nameError.textContent = "";
    });
  }

  if (drawEmail) {
    drawEmail.addEventListener("input", () => {
      drawEmail.classList.remove("is-invalid");
      if (emailError) emailError.textContent = "";
    });
  }

  if (drawForm) {
    drawForm.addEventListener("submit", (e) => {
      e.preventDefault();
      clearFormErrors();

      let isValid = true;
      const nameVal = drawName ? drawName.value.trim() : "";
      const emailVal = drawEmail ? drawEmail.value.trim() : "";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!nameVal) {
        if (drawName) drawName.classList.add("is-invalid");
        if (nameError) nameError.textContent = "Пожалуйста, укажи имя";
        isValid = false;
      }

      if (!emailVal || !emailRegex.test(emailVal)) {
        if (drawEmail) drawEmail.classList.add("is-invalid");
        if (emailError) emailError.textContent = "Введи корректный e-mail адрес";
        isValid = false;
      }

      if (agreementCheckbox && !agreementCheckbox.checked) {
        if (emailError && isValid) {
          emailError.textContent = "Необходимо согласие на обработку данных";
        }
        isValid = false;
      }

      if (!isValid) return;

      const randomCode =
        "CP-2077-" + Math.floor(100000 + Math.random() * 900000);
      const codeElement = document.getElementById("raffleTicketCode");
      if (codeElement) {
        codeElement.textContent = randomCode;
      }

      openModal("raffleModal");

      drawForm.reset();
      if (fileLabelText) fileLabelText.textContent = "Прикрепить скриншот";
      if (formLabel) formLabel.classList.remove("has-file");
    });
  }
});
