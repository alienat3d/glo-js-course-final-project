import { modalAppearAnimation, modalDisappearAnimation } from "./helpers";

export const portfolioPopupSliderFunc = () => {
  const popup = document.querySelector('.popup-portfolio');
  const textContent = popup.querySelector('.popup-portfolio-text');
  const slidesCounter = popup.querySelector('#popup-portfolio-counter');

  popup.classList.add('popup-portfolio-opened');
  textContent.classList.add('visible-content-block');

  popup.addEventListener('click', (evt) => {
    const tgt = evt.target;
    console.log(tgt.classList.contains('close'));

    if (
      tgt.classList.contains('popup-portfolio') ||
      tgt.classList.contains('close')
    ) {
      modalDisappearAnimation(popup);
      setTimeout(() => {
        textContent.classList.remove('visible-content-block');
        popup.classList.remove('popup-portfolio-opened');
      }, 0);
    }
  })
}
