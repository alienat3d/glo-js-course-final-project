import { modalAppearAnimation, modalDisappearAnimation } from "./helpers";

export const privacyPopupFunc = () => {
  const privacyButtons = document.querySelectorAll('.link-privacy');
  const privacyPopup = document.querySelector('.popup.popup-privacy');

  privacyButtons.forEach(button =>
    button.addEventListener('click', () =>
      modalAppearAnimation(privacyPopup))
  );

  privacyPopup.addEventListener('click', (evt) => {
    const tgt = evt.target;
    if (tgt.matches('.popup-privacy') || tgt.matches('.close')) {
      modalDisappearAnimation(privacyPopup);
    }
  });
}
