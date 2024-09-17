import { modalAppearAnimation, modalDisappearAnimation } from "./helpers";

export const repairTypesSliderFunc = (containerClass, slideClass) => {
	if (!containerClass || !slideClass) return;

	const sliderBlock = document.querySelector(containerClass);

	if (sliderBlock === null) return;

	let TIME_INTERVAL = 3;
  
	const slides = sliderBlock.querySelectorAll(slideClass);
	const currentSlideCountElem = sliderBlock.querySelector('.slider-counter-content__current');
	const totalSlidesCountElem = sliderBlock.querySelector('.slider-counter-content__total');

	let currentSlide = 1;
	let interval;

	const prevSlide = (elems, idx, activeClass) => {
		modalDisappearAnimation(elems[idx - 1]);
		elems[idx - 1].classList.add(activeClass);
	};
	const nextSlide = (elems, idx, activeClass) => {
		elems[idx - 1].classList.remove(activeClass);
		modalAppearAnimation(elems[idx - 1]);
	};

	const autoSlider = () => {
		prevSlide(slides, currentSlide, 'hide');
		currentSlide++;
		if (currentSlide >= slides.length + 1) currentSlide = 1;
		nextSlide(slides, currentSlide, 'hide');
		currentSlideCountElem.textContent = currentSlide;
	}

	TIME_INTERVAL = TIME_INTERVAL * 1000;

	const startSlider = (evt, intervalId, func, timer) => {
		if (evt.target.matches('.slider-arrow')) intervalId = setInterval(func, timer);
		// startSlider(TIME_INTERVAL)
	}
	const stopSlider = (evt, intervalId) => {
		if (evt.target.matches('.slider-arrow')) clearInterval(intervalId);
		// stopSlider(TIME_INTERVAL)
	}

	// Чтобы слушатели событий бесконечно не дублировались
	// function setupEventListener(selector, event, action) {
	//   document.querySelectorAll(selector).forEach(el => {
	//     el.removeEventListener(event, action);
	//     el.addEventListener(event, action);
	//   });
	// }

	const activateSlider = (evt) => {
		if (!evt.target.closest('.slider-arrow')) return;
		prevSlide(slides, currentSlide, 'hide');
		if (evt.target.closest('.slider-arrow_left')) {
			currentSlideCountElem.textContent = currentSlide--;
		} else if (evt.target.closest('.slider-arrow_right')) {
			currentSlideCountElem.textContent = currentSlide++;
		}
		if (currentSlide >= slides.length + 1) currentSlide = 1;
		if (currentSlide < 1) currentSlide = slides.length;
		nextSlide(slides, currentSlide, 'hide');
	}

	currentSlideCountElem.textContent = currentSlide;
	totalSlidesCountElem.textContent = slides.length;

	sliderBlock.addEventListener('click', (evt) => activateSlider(evt));

	sliderBlock.addEventListener('mouseenter', (evt) => stopSlider(evt, interval, autoSlider, TIME_INTERVAL));
	sliderBlock.addEventListener('mouseleave', (evt) => startSlider(evt, TIME_INTERVAL));

	// setupEventListener(containerClass, 'click', sliderInit);
	// sliderInit();
	startSlider(TIME_INTERVAL);
}
