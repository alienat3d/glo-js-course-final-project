export const formulaSliderFunc = (containerClass, slideClass) => {
  if (!containerClass || !slideClass) return;

  const sliderBlock = document.querySelector(containerClass);
  if (sliderBlock === null) return;

  const slides = sliderBlock.querySelectorAll(slideClass);
  const sliderWrapper = sliderBlock.querySelector('.formula-slider');

  let currentSlide = 0;

  const showHideItems = (sliderContainer, slides, currentIdx) => {
    sliderWrapper.innerHTML = '';
    const visibleSlides = [];
    if (currentIdx === 0) {
      slides.forEach((slide, idx, array) => {
        slide.classList.remove('active-item');
        if (currentIdx === 0 && (idx === currentIdx || idx === array.length - 1 || idx === currentIdx + 1)) {
          array[currentIdx].classList.add('active-item');
          visibleSlides.push(slide);
        }
      })
      visibleSlides.splice(0, 1, visibleSlides.splice(1, 1, visibleSlides[0])[0]);
      visibleSlides.splice(2, 1, visibleSlides.splice(0, 1, visibleSlides[2])[0]);
      visibleSlides.forEach(slide => sliderContainer.insertAdjacentElement('beforeend', slide));
    } else if (currentIdx === slides.length - 1) {
      slides.forEach((slide, idx, array) => {
        slide.classList.remove('active-item');
        if (idx === currentIdx || idx === currentIdx - 1 || idx === 0) {
          array[currentIdx].classList.add('active-item');
          visibleSlides.push(slide);
        }
      })
      visibleSlides.splice(1, 1, visibleSlides.splice(2, 1, visibleSlides[1])[0]);
      visibleSlides.splice(0, 1, visibleSlides.splice(2, 1, visibleSlides[0])[0]);
      visibleSlides.forEach(slide => sliderContainer.insertAdjacentElement('beforeend', slide));
    } else if (currentIdx > 0 || currentIdx < array.length - 2) {
      slides.forEach((slide, idx, array) => {
        slide.classList.remove('active-item');
        if (idx === currentIdx || idx === currentIdx - 1 || idx === currentIdx + 1) {
          array[currentIdx].classList.add('active-item');
          sliderContainer.insertAdjacentElement('beforeend', slide);
        }
      })
    }
  }

  sliderBlock.addEventListener('click', (evt) => {
    evt.preventDefault();
    if (!evt.target.closest('.slider-arrow')) return;
    if (evt.target.closest('.slider-arrow_left')) {
      currentSlide--;
    } else if (evt.target.closest('.slider-arrow_right')) {
      currentSlide++;
    }
    if (currentSlide >= slides.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = slides.length - 1;

    showHideItems(sliderWrapper, slides, currentSlide);
  })

  showHideItems(sliderWrapper, slides, currentSlide);
}
