import { measureWindowWidth, modalAppearAnimation, modalDisappearAnimation } from "./helpers";

export const servicesSliderFunc = () => {
  const windowWidth = measureWindowWidth();
  if (windowWidth > 558) return;

  let TIME_INTERVAL = 5;

  const slides = document.querySelectorAll('.services-slider__slide');
  const leftButton = document.querySelector('.services-slider__nav-arrow--left');
  const rightButton = document.querySelector('.services-slider__nav-arrow--right');

  let currentSlide = 0;
  let interval;

  const showSlide = () => {
    slides[currentSlide].classList.remove('hide');
    modalAppearAnimation(slides[currentSlide]);
    slides[(currentSlide + 1)].classList.remove('hide');
    modalAppearAnimation(slides[(currentSlide + 1)]);
  }

  const hideSlide = () => {
    slides[currentSlide].classList.add('hide');
    modalDisappearAnimation(slides[currentSlide]);
    slides[(currentSlide + 1)].classList.add('hide');
    modalDisappearAnimation(slides[(currentSlide + 1)]);
  }

	const autoSlider = () => {
    hideSlide();
		currentSlide++;
		if (currentSlide >= (slides.length / 2)) currentSlide = 0;
    showSlide();
	}

  const startSlider = (timer) => interval = setInterval(autoSlider, timer);

	const stopSlider = () => clearInterval(interval);

  TIME_INTERVAL = TIME_INTERVAL * 1000;

  leftButton.addEventListener('click', () => {
    stopSlider();
    hideSlide();
    currentSlide--;
		if (currentSlide < 0) currentSlide = (slides.length / 2) - 1;
    showSlide();
  })

  rightButton.addEventListener('click', () => {
    stopSlider();
    hideSlide();
    currentSlide++;
    if (currentSlide >= (slides.length / 2)) currentSlide = 0;
    showSlide();
  })

  startSlider(TIME_INTERVAL);
}
