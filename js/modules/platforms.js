/**
 * Platform radio selector controller.
 */

export function initPlatformSelector() {
  const platformRadios = document.querySelectorAll("input[name='platform']");
  const platformLabel = document.getElementById('selectedPlatformLabel');

  platformRadios.forEach((radio) => {
    radio.addEventListener('change', () => {
      if (radio.checked) {
        if (platformLabel) {
          platformLabel.textContent = radio.value;
        }

        // Visual active styling for label containers
        document.querySelectorAll('.get-platform__list').forEach((item) => {
          const input = item.querySelector("input[name='platform']");
          item.classList.toggle('is-active', Boolean(input && input.checked));
        });
      }
    });
  });
}
