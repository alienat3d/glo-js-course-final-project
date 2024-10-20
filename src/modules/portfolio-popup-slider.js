import { modalAppearAnimation, modalDisappearAnimation } from "./helpers";

export const portfolioPopupSliderFunc = () => {
  const portfolioGalleryWrapper = document.querySelector('.portfolio-slider-wrap');
  const popup = document.querySelector('.popup-portfolio');
  const textContents = popup.querySelectorAll('.popup-portfolio-text');
  const currentCounter = popup.querySelector('.slider-counter-content__current');
  const totalCounter = popup.querySelector('.slider-counter-content__total');
  const popupPhotos = popup.querySelectorAll('.popup-portfolio-slider__slide');
  const leftButton = popup.querySelector('.popup-arrow_left');
  const rightButton = popup.querySelector('.popup-arrow_right');

  let currentSlide = 1;

  totalCounter.textContent = popupPhotos.length;

  const initSlider = () => {
    currentCounter.textContent = currentSlide;
    popupPhotos.forEach((photo, idx) => {
      if (!photo.classList.contains('hide')) {
        photo.classList.add('hide');
        textContents[idx].classList.remove('visible-content-block');
      }
      if (+currentSlide === idx + 1) {
        photo.classList.remove('hide');
        textContents[idx].classList.add('visible-content-block');
      }
    });

    if (+currentSlide === 1 && !leftButton.classList.contains('hide')) {
      leftButton.classList.add('hide');
    } else if (+currentSlide > 1) {
      leftButton.classList.remove('hide');
    }
    if (+currentSlide === popupPhotos.length && !rightButton.classList.contains('hide')) {
      rightButton.classList.add('hide');
    } else if (+currentSlide < popupPhotos.length) {
      rightButton.classList.remove('hide');
    }
  }

  portfolioGalleryWrapper.addEventListener('click', (evt) => {
    const tgt = evt.target;
    if (tgt.dataset.slide) {
      currentSlide = tgt.dataset.slide;

      initSlider();

      modalAppearAnimation(popup);
      popup.classList.add('popup-portfolio-opened');
    }
  })

  popup.addEventListener('click', (evt) => {
    const tgt = evt.target;

    if (
      tgt.classList.contains('popup-portfolio') ||
      tgt.classList.contains('close')
    ) {
      modalDisappearAnimation(popup);
      setTimeout(() => popup.classList.remove('popup-portfolio-opened'), 200);
    }

    if (tgt.closest('.popup-arrow_left')) {
      currentSlide--;
      initSlider();
    }
    if (tgt.closest('.popup-arrow_right')) {
      currentSlide++
      initSlider();
    }
  })
}
