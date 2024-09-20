// import { measureWindowWidth, modalAppearAnimation, modalDisappearAnimation } from "./helpers";
// import { repairTypesSliderFunc } from "./repair-types-slider";

export const repairTypesNavSliderFunc = () => {
  // if (!containerClass) return;

  // const windowWidth = measureWindowWidth();
  // if (windowWidth > 1007) return;

  // const sliderBlock = document.querySelector('.nav-wrap-repair-types');
  // if (sliderBlock === null) return;

  // const sliderButtons = sliderBlock.querySelectorAll('button');

  // const tabsContentParent = document.querySelector('.repair-types-slider');
  // const tabsContentElements = tabsContentParent.querySelectorAll('.repair-types-slider > div');

  let currentSlide = 0;

  const prevSlide = (elems, idx, hideClass, activeClass) => {
    modalDisappearAnimation(elems[idx]);
    elems[idx].classList.add(hideClass);
    elems[idx].classList.remove(activeClass);
  };

  const nextSlide = (elems, idx, hideClass, activeClass) => {
    elems[idx].classList.add(activeClass);
    elems[idx].classList.remove(hideClass);
    modalAppearAnimation(elems[idx]);
  };

  sliderButtons.forEach((slide, idx) => {
    if (idx === 0) return;
    slide.classList.add('hide');
  });

  sliderBlock.addEventListener('click', (evt) => {
    evt.preventDefault();
    if (!evt.target.closest('.nav-arrow')) return;

    prevSlide(sliderButtons, currentSlide, 'hide', 'active');
    prevSlide(tabsContentElements, currentSlide, 'hide');

    if (evt.target.closest('.nav-arrow_left')) {
      currentSlide--;
    } else if (evt.target.closest('.nav-arrow_right')) {
      currentSlide++;
    }
    if (currentSlide >= sliderButtons.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = sliderButtons.length - 1;

    nextSlide(sliderButtons, currentSlide, 'hide', 'active');
    nextSlide(tabsContentElements, currentSlide, 'hide');

    repairTypesSliderFunc(
      '.repair-types-slider-wrap', `.types-repair${currentSlide + 1} .repair-types-slider__slide`
    )
  })
}
