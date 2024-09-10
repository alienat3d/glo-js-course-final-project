import { modalAppearAnimation, modalDisappearAnimation } from "./helpers";

export const privacyPopupFunc = () => {
  const privacyButtons = document.querySelectorAll('span.link-privacy');
  const privacyPopup = document.querySelector('.popup.popup-privacy');
  const closeButton = privacyPopup.querySelector('.close');

  privacyButtons.forEach(button =>
    button.addEventListener('click', () =>
      modalAppearAnimation(privacyPopup))
  );

  closeButton.addEventListener('click', () => modalDisappearAnimation(privacyPopup));
}
