/**
 * Modal management using native HTML5 <dialog> API.
 */

export function initModals() {
  const openModal = (dialogId) => {
    const dialog = document.getElementById(dialogId);
    if (!dialog) return;

    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
  };

  const closeModal = (dialog) => {
    if (!dialog) return;
    if (typeof dialog.close === 'function') {
      dialog.close();
    } else {
      dialog.removeAttribute('open');
    }
  };

  // Close triggers
  document.querySelectorAll('[data-modal-close]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const dialog = btn.closest('dialog');
      if (dialog) closeModal(dialog);
    });
  });

  // Native backdrop click closing
  document.querySelectorAll('dialog.cyber-modal').forEach((dialog) => {
    dialog.addEventListener('click', (e) => {
      const rect = dialog.getBoundingClientRect();
      const isInDialog =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;

      if (!isInDialog) {
        closeModal(dialog);
      }
    });
  });

  // Modal open triggers
  const hpDetailsBtn = document.getElementById('hpDetailsBtn');
  if (hpDetailsBtn) {
    hpDetailsBtn.addEventListener('click', () => openModal('hpModal'));
  }

  const licenseBtn = document.getElementById('licenseBtn');
  if (licenseBtn) {
    licenseBtn.addEventListener('click', () => openModal('licenseModal'));
  }

  const privacyBtn = document.getElementById('privacyBtn');
  if (privacyBtn) {
    privacyBtn.addEventListener('click', () => openModal('privacyModal'));
  }

  return { openModal, closeModal };
}
