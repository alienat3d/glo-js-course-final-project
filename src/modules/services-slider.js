import { measureWindowWidth, modalAppearAnimation, modalDisappearAnimation } from "./helpers";

export const servicesSliderFunc = () => {
  const windowWidth = measureWindowWidth();
  if (windowWidth > 558) return;

  const slides = document.querySelectorAll('.services-slider__slide');
  const leftButton = document.querySelector('.services-slider__nav-arrow--left');
  const rightButton = document.querySelector('.services-slider__nav-arrow--right');

  let currentSlide = 0;
  let interval;

  const startSlider = (func, timer) => interval = setInterval(func, timer);

  const stopSlider = () => clearInterval(interval);

  if (windowWidth <= 558 && windowWidth > 454) {
    let TIME_INTERVAL = 5;

    const showTwoItems = () => {
      slides[currentSlide].classList.remove('hide');
      modalAppearAnimation(slides[currentSlide]);
      slides[(currentSlide + 1)].classList.remove('hide');
      modalAppearAnimation(slides[(currentSlide + 1)]);
    }

    const hideTwoItems = () => {
      slides[currentSlide].classList.add('hide');
      modalDisappearAnimation(slides[currentSlide]);
      slides[(currentSlide + 1)].classList.add('hide');
      modalDisappearAnimation(slides[(currentSlide + 1)]);
    }

    const autoSliderTablet = () => {
      hideTwoItems();
      currentSlide++;
      if (currentSlide >= (slides.length / 2)) currentSlide = 0;
      showTwoItems();
    }

    leftButton.addEventListener('click', () => {
      stopSlider();
      hideTwoItems();
      currentSlide--;
      if (currentSlide < 0) currentSlide = (slides.length / 2) - 1;
      showTwoItems();
    })

    rightButton.addEventListener('click', () => {
      stopSlider();
      hideTwoItems();
      currentSlide++;
      if (currentSlide >= (slides.length / 2)) currentSlide = 0;
      showTwoItems();
    })

    TIME_INTERVAL = TIME_INTERVAL * 1000;

    startSlider(autoSliderTablet, TIME_INTERVAL);
  }

  if (windowWidth <= 454) {
    let TIME_INTERVAL = 3;

    const showOneItem = () => {
      slides[currentSlide].classList.remove('hide');
      modalAppearAnimation(slides[currentSlide]);
    }

    const hideOneItem = () => {
      slides[currentSlide].classList.add('hide');
      modalDisappearAnimation(slides[currentSlide]);
    }

    const autoSliderMobile = () => {
      hideOneItem();
      currentSlide++;
      if (currentSlide >= slides.length) currentSlide = 0;
      showOneItem();
    }

    leftButton.addEventListener('click', () => {
      stopSlider();
      hideOneItem();
      currentSlide--;
      if (currentSlide < 0) currentSlide = slides.length - 1;
      showOneItem();
    })

    rightButton.addEventListener('click', () => {
      stopSlider();
      hideOneItem();
      currentSlide++;
      if (currentSlide >= slides.length) currentSlide = 0;
      showOneItem();
    })

    slides[1].classList.add('hide');

    TIME_INTERVAL = TIME_INTERVAL * 1000;

    startSlider(autoSliderMobile, TIME_INTERVAL);
  }
}
