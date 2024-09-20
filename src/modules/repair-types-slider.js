import { measureWindowWidth, modalAppearAnimation, modalDisappearAnimation } from "./helpers";

export const repairTypesSliderFunc = () => {
  let TIME_INTERVAL = 3;

  const tabsWrapper = document.querySelector('.nav-wrap-repair-types');
  const tabsParent = tabsWrapper.querySelector('.nav-list-repair');
  const tabsButtons = tabsParent.querySelectorAll('button');
  const tabsContentParent = document.querySelector('.repair-types-slider');
  const tabsContentElements = tabsContentParent.querySelectorAll('.repair-types-slider > div');
  const sliderNavTabs = tabsWrapper.querySelectorAll('button');

  const sliderBlock = document.querySelector('.repair-types-slider-wrap');
  const sliderSlides = sliderBlock.querySelectorAll('.types-repair-slides');
  const currentSlideCountElem = sliderBlock.querySelector('.slider-counter-content__current');
  const totalSlidesCountElem = sliderBlock.querySelector('.slider-counter-content__total');

  const windowWidth = measureWindowWidth();

  let slides = sliderSlides[0].querySelectorAll('div');

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

  const startSlider = function (timer) {
    interval = setInterval(autoSlider, timer);
  }
  const stopSlider = function (intervalId) {
    clearInterval(intervalId);
  }

  const initSlider = (evt) => {
    currentSlideCountElem.textContent = currentSlide;

    if (!evt.target.closest('.slider-arrow')) return;
    prevSlide(slides, currentSlide, 'hide');
    if (evt.target.closest('.slider-arrow_left')) {
      currentSlide--;
    } else if (evt.target.closest('.slider-arrow_right')) {
      currentSlide++;
    }
    if (currentSlide >= slides.length + 1) currentSlide = 1;
    if (currentSlide < 1) currentSlide = slides.length;
    currentSlideCountElem.textContent = currentSlide;
    nextSlide(slides, currentSlide, 'hide');
  }

  sliderBlock.addEventListener('click', initSlider);

  currentSlideCountElem.textContent = currentSlide;
  totalSlidesCountElem.textContent = slides.length;

  sliderBlock.addEventListener('mouseenter', (evt) => {
    if (evt.target.matches('.slider-arrow')) stopSlider(interval);
  }, true);
  sliderBlock.addEventListener('mouseleave', (evt) => {
    if (evt.target.matches('.slider-arrow')) startSlider(TIME_INTERVAL);
  }, true);

  startSlider(TIME_INTERVAL);

  const activateTab = (tabNumber) => {
    tabsButtons.forEach(tab => tab.classList.remove('active'));
    tabsButtons[tabNumber - 1].classList.add('active');

    tabsContentElements.forEach((contentElem, idx) => {
      if (idx === tabNumber - 1) {
        stopSlider(interval);
        slides = sliderSlides[tabNumber - 1].querySelectorAll('div');
        contentElem.classList.remove('hide');
        modalAppearAnimation(contentElem);
        currentSlide = 1;
        currentSlideCountElem.textContent = currentSlide;
        totalSlidesCountElem.textContent = slides.length;
        startSlider(TIME_INTERVAL);
      } else {
        modalDisappearAnimation(contentElem);
        contentElem.classList.add('hide');
      }
    });
  }

  const handleClick = (evt) => {
    if (!evt.target.closest('button')) return;

    const tabNumber = evt.target.dataset.order;
    activateTab(tabNumber);
  }

  tabsParent.addEventListener('click', handleClick);

  // Navigation Tabs Slider for the Narrow Screens
  if (windowWidth < 1007) {
    console.log('narrow');

    let currentNavSlide = 0;

    const prevNavSlide = (elems, idx, hideClass, activeClass) => {
      modalDisappearAnimation(elems[idx]);
      elems[idx].classList.add(hideClass);
      elems[idx].classList.remove(activeClass);
    };

    const nextNavSlide = (elems, idx, hideClass, activeClass) => {
      elems[idx].classList.add(activeClass);
      elems[idx].classList.remove(hideClass);
      modalAppearAnimation(elems[idx]);
    };

    sliderNavTabs.forEach((slide, idx) => {
      if (idx === 0) return;
      slide.classList.add('hide');
    });

    tabsWrapper.addEventListener('click', (evt) => {
      evt.preventDefault();
      if (!evt.target.closest('.nav-arrow')) return;

      prevNavSlide(sliderNavTabs, currentNavSlide, 'hide', 'active');
      prevNavSlide(tabsContentElements, currentNavSlide, 'hide');

      if (evt.target.closest('.nav-arrow_left')) {
        currentNavSlide--;
      } else if (evt.target.closest('.nav-arrow_right')) {
        currentNavSlide++;
      }
      if (currentNavSlide >= sliderNavTabs.length) currentNavSlide = 0;
      if (currentNavSlide < 0) currentNavSlide = sliderNavTabs.length - 1;

      nextNavSlide(sliderNavTabs, currentNavSlide, 'hide', 'active');
      nextNavSlide(tabsContentElements, currentNavSlide, 'hide');

      tabsContentElements.forEach((contentElem, idx) => {
        if (idx === currentNavSlide) {
          stopSlider(interval);
          slides = sliderSlides[currentNavSlide].querySelectorAll('div');
          // contentElem.classList.remove('hide');
          // modalAppearAnimation(contentElem);
          currentSlide = 1;
          currentSlideCountElem.textContent = currentSlide;
          totalSlidesCountElem.textContent = slides.length;
          startSlider(TIME_INTERVAL);
        } else {
          // modalDisappearAnimation(contentElem);
          // contentElem.classList.add('hide');
        }
      });
      // repairTypesSliderFunc(
      //   '.repair-types-slider-wrap', `.types-repair${currentSlide + 1} .repair-types-slider__slide`
      // )
    })
  }
}
