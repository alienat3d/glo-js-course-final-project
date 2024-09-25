import { measureWindowWidth } from "./helpers";

export const contractSliderFunc = () => {
  const windowWidth = measureWindowWidth();
  if (windowWidth >= 1074) return;

  const sliderWrapper = document.querySelector('.transparency-slider-wrap');
  const slides = sliderWrapper.querySelectorAll('.transparency-item');
  const leftButton = sliderWrapper.querySelector('.slider-arrow_left');
  const rightButton = sliderWrapper.querySelector('.slider-arrow_right');

  let currentSlide = 1;

  leftButton.classList.add('hide');
  slides.forEach((slide, idx) => {
    if (idx === 0) return;
    slide.classList.add('hide');
  });

  const initSlider = () => {
    slides.forEach((slide, idx) => {
      if (!slide.classList.contains('hide')) slide.classList.add('hide');
      if (+currentSlide === idx + 1) slide.classList.remove('hide');
    });

    if (+currentSlide === 1 && !leftButton.classList.contains('hide')) {
      leftButton.classList.add('hide');
    } else if (+currentSlide > 1) {
      leftButton.classList.remove('hide');
    }
    if (+currentSlide === slides.length && !rightButton.classList.contains('hide')) {
      rightButton.classList.add('hide');
    } else if (+currentSlide < slides.length) {
      rightButton.classList.remove('hide');
    }
  }

  sliderWrapper.addEventListener('click', (evt) => {
    const tgt = evt.target;

    if (tgt.closest('.slider-arrow_left')) {
      currentSlide--;
      initSlider();
    }
    if (tgt.closest('.slider-arrow_right')) {
      currentSlide++
      initSlider();
    }
  })
}
