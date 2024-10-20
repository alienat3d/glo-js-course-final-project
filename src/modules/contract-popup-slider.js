import { modalAppearAnimation, modalDisappearAnimation } from "./helpers";

export const contractPopupSliderFunc = () => {
  const galleryWrapper = document.querySelector('.transparency-slider-wrap');
  const popup = document.querySelector('.popup-transparency');
  const leftButton = popup.querySelector('.popup-arrow_transparency_left');
  const rightButton = popup.querySelector('.popup-arrow_transparency_right');
  const currentCounter = popup.querySelector('.slider-counter-content__current');
  const totalCounter = popup.querySelector('.slider-counter-content__total');
  const popupPhotos = popup.querySelectorAll('.popup-transparency-slider__slide');

  let currentSlide;

  const initSlider = () => {
    currentCounter.textContent = currentSlide;
    popupPhotos.forEach((photo, idx) => {
      if (!photo.classList.contains('hide')) photo.classList.add('hide');
      if (+currentSlide === idx + 1) photo.classList.remove('hide');
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

  totalCounter.textContent = popupPhotos.length;

  galleryWrapper.addEventListener('click', (evt) => {
    const tgt = evt.target;
    if (tgt.dataset.slide) {
      currentSlide = tgt.dataset.slide;

      initSlider();

      modalAppearAnimation(popup);
      popup.classList.add('popup-transparency-opened');
    }
  })

  popup.addEventListener('click', (evt) => {
    const tgt = evt.target;

    if (
      tgt.classList.contains('popup-transparency') ||
      tgt.classList.contains('close')
    ) {
      modalDisappearAnimation(popup);
      setTimeout(() => popup.classList.remove('popup-transparency-opened'), 200);
    }

    if (tgt.closest('.popup-arrow_transparency_left')) {
      currentSlide--;
      initSlider();
    }
    if (tgt.closest('.popup-arrow_transparency_right')) {
      currentSlide++
      initSlider();
    }
  })
}
