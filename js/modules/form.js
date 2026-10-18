/**
 * Raffle entry form with asynchronous dispatch and persistent ticket tracking.
 */

export function initRaffleForm(openModalFn) {
  const drawForm = document.getElementById('drawForm');
  const drawName = document.getElementById('drawName');
  const drawEmail = document.getElementById('drawEmail');
  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const agreementCheckbox = document.getElementById('agreementCheckbox');
  const agreementError = document.getElementById('agreementError');
  const fileInput = document.getElementById('file-upload');
  const fileLabelText = document.getElementById('fileUploadText');
  const formLabel = document.querySelector('.form-label');

  // File selection display
  if (fileInput && fileLabelText) {
    fileInput.addEventListener('change', () => {
      if (fileInput.files && fileInput.files.length > 0) {
        const file = fileInput.files[0];
        const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
        fileLabelText.textContent = `${file.name} (${sizeMb} МБ)`;
        if (formLabel) formLabel.classList.add('has-file');
      } else {
        fileLabelText.textContent = 'Прикрепить скриншот';
        if (formLabel) formLabel.classList.remove('has-file');
      }
    });
  }

  const clearErrors = () => {
    if (drawName) drawName.classList.remove('is-invalid');
    if (drawEmail) drawEmail.classList.remove('is-invalid');
    if (nameError) nameError.textContent = '';
    if (emailError) emailError.textContent = '';
    if (agreementError) agreementError.textContent = '';
  };

  if (drawName) {
    drawName.addEventListener('input', () => {
      drawName.classList.remove('is-invalid');
      if (nameError) nameError.textContent = '';
    });
  }

  if (drawEmail) {
    drawEmail.addEventListener('input', () => {
      drawEmail.classList.remove('is-invalid');
      if (emailError) emailError.textContent = '';
    });
  }

  if (!drawForm) return;

  drawForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearErrors();

    let isValid = true;
    const nameVal = drawName ? drawName.value.trim() : '';
    const emailVal = drawEmail ? drawEmail.value.trim() : '';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameVal) {
      if (drawName) drawName.classList.add('is-invalid');
      if (nameError) nameError.textContent = 'Укажите позывной или имя наёмника';
      isValid = false;
    }

    if (!emailVal || !emailRegex.test(emailVal)) {
      if (drawEmail) drawEmail.classList.add('is-invalid');
      if (emailError) emailError.textContent = 'Укажите действительный защищённый e-mail';
      isValid = false;
    }

    if (agreementCheckbox && !agreementCheckbox.checked) {
      if (agreementError) agreementError.textContent = 'Требуется согласие на обработку персональных данных';
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    const submitBtn = drawForm.querySelector("button[type='submit']");
    const originalBtnText = submitBtn ? submitBtn.textContent : 'Отправить';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'ОТПРАВКА В СЕТЬ...';
    }

    const ticketCode = 'NC-' + Math.floor(100000 + Math.random() * 900000);
    const payload = {
      name: nameVal,
      email: emailVal,
      ticketCode,
      submittedAt: new Date().toISOString()
    };

    try {
      await fetch('https://httpbin.org/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => {});

      const tickets = JSON.parse(localStorage.getItem('cp_raffle_tickets') || '[]');
      tickets.unshift(payload);
      localStorage.setItem('cp_raffle_tickets', JSON.stringify(tickets.slice(0, 10)));
    } catch {}

    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = originalBtnText;
    }

    const codeElement = document.getElementById('raffleTicketCode');
    if (codeElement) {
      codeElement.textContent = ticketCode;
    }

    if (typeof openModalFn === 'function') {
      openModalFn('raffleModal');
    }

    drawForm.reset();
    if (fileLabelText) fileLabelText.textContent = 'Прикрепить скриншот';
    if (formLabel) formLabel.classList.remove('has-file');
  });
}
