import { modalAppearAnimation, modalDisappearAnimation } from "./helpers";

export const repairTypesSliderFunc = (containerClass, slideClass) => {
  if (!containerClass || !slideClass) return;

  const sliderBlock = document.querySelector(containerClass);

  if (sliderBlock === null) return;

  let TIME_INTERVAL = 3;

  const slides = sliderBlock.querySelectorAll(slideClass);

  let currentSlide = 0;
  let interval;

	const prevSlide = (elems, idx, activeClass) => {
    modalDisappearAnimation(elems[idx]);
    elems[idx].classList.add(activeClass);
  };
	const nextSlide = (elems, idx, activeClass) => {
    elems[idx].classList.remove(activeClass);
    modalAppearAnimation(elems[idx]);
  };

	const autoSlider = () => {
		prevSlide(slides, currentSlide, 'hide');
		currentSlide++;
		if (currentSlide >= slides.length) currentSlide = 0;
		nextSlide(slides, currentSlide, 'hide');
	}

	TIME_INTERVAL = TIME_INTERVAL * 1000;

	const startSlider = (timer) => {
		interval = setInterval(autoSlider, timer);
	}
	const stopSlider = () => {
		clearInterval(interval);
	}

  sliderBlock.addEventListener('click', (evt) => {
    evt.preventDefault();
    if (!evt.target.closest('.slider-arrow')) return;
    prevSlide(slides, currentSlide, 'hide');
    if (evt.target.closest('.slider-arrow_left')) {
      currentSlide--;
    } else if (evt.target.closest('.slider-arrow_right')) {
      currentSlide++;
    }
    if (currentSlide >= slides.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = slides.length - 1;

    nextSlide(slides, currentSlide, 'hide');
  })

	sliderBlock.addEventListener('mouseenter', (evt) => {
		if (evt.target.matches('.slider-arrow')) stopSlider(TIME_INTERVAL);
	}, true)
	sliderBlock.addEventListener('mouseleave', (evt) => {
		if (evt.target.matches('.slider-arrow')) startSlider(TIME_INTERVAL);
	}, true)

	startSlider(TIME_INTERVAL);
}
