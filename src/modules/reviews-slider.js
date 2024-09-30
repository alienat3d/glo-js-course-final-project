export const reviewsSliderFunc = () => {
  let TIME_INTERVAL = 5;

  const sliderWrapper = document.querySelector('.reviews');
  const slider = sliderWrapper.querySelector('.reviews-slider');
  const descriptions = sliderWrapper.querySelectorAll('.reviews-slider__slide-descr');
  const slides = sliderWrapper.querySelectorAll('.reviews-slider__slide');
  const moreButtons = sliderWrapper.querySelectorAll('.link-reviews-detail');
  const dots = sliderWrapper.querySelectorAll('.dot');

  let currentSlide = 0;
  let isAutoOn = false;
  let interval;

  const addClass = (elems, idx, activeClass) => elems[idx].classList.add(activeClass);
	const removeClass = (elems, idx, activeClass) => elems[idx].classList.remove(activeClass);

	const autoSlider = () => {
		addClass(slides, currentSlide, 'hide');
		removeClass(dots, currentSlide, 'dot_active');
		currentSlide++;
		if (currentSlide >= slides.length) currentSlide = 0;
		removeClass(slides, currentSlide, 'hide');
		addClass(dots, currentSlide, 'dot_active');
	}

  const startSlider = (timer) => {
    if (isAutoOn) return;
		interval = setInterval(autoSlider, timer);
    isAutoOn = true;
	}

	const stopSlider = () => {
    clearInterval(interval);
    isAutoOn = false;
  }

  TIME_INTERVAL = TIME_INTERVAL * 1000;

  sliderWrapper.addEventListener('click', (evt) => {
    const tgt = evt.target;

    addClass(slides, currentSlide, 'hide');
		removeClass(dots, currentSlide, 'dot_active');

		if (tgt.closest('#reviews-arrow_left')) {
      slider.classList.remove('full-text');
      removeClass(moreButtons, currentSlide, 'hide');
      addClass(descriptions, currentSlide, 'collapsed');
			currentSlide--;
      startSlider(TIME_INTERVAL);
		} else if (tgt.closest('#reviews-arrow_right')) {
      slider.classList.remove('full-text');
      removeClass(moreButtons, currentSlide, 'hide');
      addClass(descriptions, currentSlide, 'collapsed');
			currentSlide++;
      startSlider(TIME_INTERVAL);
		} else if (tgt.classList.contains('dot')) {
			dots.forEach((dot, idx) => {
				if (tgt === dot) currentSlide = idx;
			});
      slider.classList.remove('full-text');
      removeClass(moreButtons, currentSlide, 'hide');
      addClass(descriptions, currentSlide, 'collapsed');
      startSlider(TIME_INTERVAL);
		} else if (tgt.matches('.link-reviews-detail') || tgt.closest('.reviews-slider__slide-descr')) {
      addClass(moreButtons, currentSlide, 'hide');
      removeClass(descriptions, currentSlide, 'collapsed');
      slider.classList.add('full-text');
      stopSlider(TIME_INTERVAL);
    }

		if (currentSlide >= slides.length) currentSlide = 0;
		if (currentSlide < 0) currentSlide = slides.length - 1;

    removeClass(slides, currentSlide, 'hide');
		addClass(dots, currentSlide, 'dot_active');
  })

  sliderWrapper.addEventListener('mouseenter', (evt) => {
    if (!isAutoOn) return;
		if (evt.target.matches('.dot, .slider-arrow, .reviews-slider__slide')) stopSlider(TIME_INTERVAL);
	}, true)
	sliderWrapper.addEventListener('mouseleave', (evt) => {
		if (evt.target.matches('.dot, .slider-arrow, .reviews-slider__slide') && !slider.classList.contains('full-text')) startSlider(TIME_INTERVAL);
	}, true)

  startSlider(TIME_INTERVAL);
}
