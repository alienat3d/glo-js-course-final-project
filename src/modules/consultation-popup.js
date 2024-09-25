import { modalAppearAnimation, modalDisappearAnimation } from "./helpers";

export const consultationPopupFunc = () => {
  const modalButtons = document.querySelectorAll('.consultation-btn');
  const popup = document.querySelector('.popup-consultation');

  modalButtons.forEach(button => {
    button.addEventListener('click', () => {
      modalAppearAnimation(popup);
      popup.classList.add('popup-consultation-opened');
    })
  });

  popup.addEventListener('click', (evt) => {
    const tgt = evt.target;

    if (
      tgt.classList.contains('popup-consultation') ||
      tgt.classList.contains('close')
    ) {
      modalDisappearAnimation(popup);
      setTimeout(() => {
        popup.classList.remove('popup-consultation-opened');
      }, 0);
    }
  });
}
