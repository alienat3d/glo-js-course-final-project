import { modalAppearAnimation, modalDisappearAnimation } from "./helpers";

export const portfolioSliderFunc = () => {
  const wrapper = document.querySelector('.portfolio-slider-wrap');
  const buttonLeft = wrapper.querySelector('#portfolio-arrow_left');
  const buttonRight = wrapper.querySelector('#portfolio-arrow_right');
  const sliderWrapper = wrapper.querySelector('.portfolio-slider');
  const slides = sliderWrapper.querySelectorAll('.portfolio-slider__slide');

  const totalSlides = slides.length;

  let lastShownSlide = 3;

  const showOtherSlidesGroup = (elems, lastSlide, activeClass) => {
    elems.forEach(elem => {
      modalDisappearAnimation(elem);
      elem.classList.add(activeClass);
    });
    elems.forEach((elem, idx) => {
      if (idx >= lastSlide - 3) {
        elem.classList.remove(activeClass);
        modalAppearAnimation(elem);
      }
    });
  };

  wrapper.addEventListener('click', (evt) => {
    const tgt = evt.target;

    if (tgt.closest('#portfolio-arrow_left')) {
      lastShownSlide = lastShownSlide - 3;
    } else if (tgt.closest('#portfolio-arrow_right')) {
      lastShownSlide = lastShownSlide + 3;
    }

    if (lastShownSlide >= totalSlides) {
      modalDisappearAnimation(buttonRight);
      buttonRight.classList.add('hide');
    } else if (lastShownSlide <= 3) {
      modalDisappearAnimation(buttonLeft);
      buttonLeft.classList.add('hide');
    }
    if (lastShownSlide > 3) {
      buttonLeft.classList.remove('hide');
      modalAppearAnimation(buttonLeft);
    } else if (lastShownSlide < totalSlides) {
      buttonRight.classList.remove('hide');
      modalAppearAnimation(buttonRight);
    }

    showOtherSlidesGroup(slides, lastShownSlide, 'hide');
  })
}
