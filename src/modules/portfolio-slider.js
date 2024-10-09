import { measureWindowWidth, modalAppearAnimation, modalDisappearAnimation } from "./helpers";

export const portfolioSliderFunc = () => {
  const windowWidth = measureWindowWidth();
  console.log(windowWidth);

  const wrapper = document.querySelector('.portfolio-slider-wrap');
  const navButtons = wrapper.querySelectorAll('.slider-arrow');
  // const navButtonsMobile = wrapper.querySelectorAll('.slider-arrow-tablet-mobile');
  const sliderWrapper = wrapper.querySelector('.portfolio-slider');
  const counterCurrent = wrapper.querySelector('.slider-counter-content__current');
  const counterTotal = wrapper.querySelector('.slider-counter-content__total');
  const slides = sliderWrapper.querySelectorAll('.portfolio-slider__slide');
  // const slidesItems = sliderWrapper.querySelectorAll('.portfolio-slider__slide-frame');

  const totalSlides = slides.length;

  const showOtherSlidesGroup = (elems, lastSlide, activeClass, amount = 0) => {
    elems.forEach(elem => {
      modalDisappearAnimation(elem);
      elem.classList.add(activeClass);
    });
    elems.forEach((elem, idx) => {
      if (idx >= lastSlide - amount) {
        elem.classList.remove(activeClass);
        modalAppearAnimation(elem);
      }
    });
  };

  if (windowWidth > 1007) {
    const sliderInit = (slidesCollection, navBtns, itemsAmount) => {
      let lastShownSlide = itemsAmount;

      wrapper.addEventListener('click', (evt) => {
        const tgt = evt.target;

        if (tgt.closest(`#${navBtns[0].id}`)) {
          lastShownSlide = lastShownSlide - itemsAmount;
        } else if (tgt.closest(`#${navBtns[1].id}`)) {
          lastShownSlide = lastShownSlide + itemsAmount;
        }

        if (lastShownSlide >= totalSlides) {
          modalDisappearAnimation(navBtns[1]);
          navBtns[1].classList.add('hide');
        } else if (lastShownSlide <= itemsAmount) {
          modalDisappearAnimation(navBtns[0]);
          navBtns[0].classList.add('hide');
        }
        if (lastShownSlide > itemsAmount) {
          navBtns[0].classList.remove('hide');
          modalAppearAnimation(navBtns[0]);
        } else if (lastShownSlide < totalSlides) {
          navBtns[1].classList.remove('hide');
          modalAppearAnimation(navBtns[1]);
        }

        showOtherSlidesGroup(slidesCollection, lastShownSlide, 'hide', itemsAmount);
      })
    }
    sliderInit(slides, navButtons, 3);
  }

  if (windowWidth < 1008) {
    const showOtherSlidesGroup2 = (elems, lastSlide, activeClass) => {
      elems.forEach(elem => {
        if (!elem.classList.contains(activeClass)) {
          modalDisappearAnimation(elem);
          elem.classList.add(activeClass);
        }
      });
      elems.forEach((elem, idx) => {
        // if (idx === lastSlide - 1 || idx === lastSlide) {
        if (idx >= lastSlide - 1) {
          elem.classList.remove(activeClass);
          modalAppearAnimation(elem);
        }
      });
    };

    const sliderInitTab = (slidesCollection, navButtons) => {
      let lastShownGroup = 1;
      let counter = 1;
      let totalSlides2;

      slides.length % 2 === 0 ?
        totalSlides2 = slides.length / 2 :
        totalSlides2 = Math.floor(slides.length / 2) + 1;

      wrapper.addEventListener('click', (evt) => {
        const tgt = evt.target;

        if (tgt.closest('#portfolio-arrow_left')) {
          lastShownGroup = lastShownGroup - 2;
          counter--;
        } else if (tgt.closest('#portfolio-arrow_right')) {
          lastShownGroup = lastShownGroup + 2;
          counter++;
        }

        if (counter >= totalSlides2) {
          modalDisappearAnimation(navButtons[1]);
          navButtons[1].classList.add('hide');
        } else if (counter <= 1) {
          modalDisappearAnimation(navButtons[0]);
          navButtons[0].classList.add('hide');
        }
        if (counter > 1) {
          navButtons[0].classList.remove('hide');
          modalAppearAnimation(navButtons[0]);
        } else if (counter < totalSlides2) {
          navButtons[1].classList.remove('hide');
          modalAppearAnimation(navButtons[1]);
        }
        // showOtherSlidesGroup(slidesCollection, lastShownGroup, 'hide');
        showOtherSlidesGroup2(slidesCollection, lastShownGroup, 'hide');

        counterCurrent.textContent = counter;
      })

      counterTotal.textContent = totalSlides2;
    }

    sliderInitTab(slides, navButtons);
  }

  if (windowWidth <= 900) {
    slides.forEach((slide, idx) => {
      if (!slide.classList.contains('hide') && idx > 0) {
        slide.classList.add('hide')
      }
    });
    // sliderInit(slides, navButtons, 2);
  }

  // if (windowWidth <= 575) {
  //   slides.forEach((slide) => {
  //     if (slide.classList.contains('hide')) slide.classList.remove('hide');
  //   });

  //   slidesItems.forEach((item, idx) => {
  //     if (idx > 0) item.classList.add('hide')
  //   });

  //   sliderInit(slidesItems, navButtonsMobile, 1);
  // }
}
