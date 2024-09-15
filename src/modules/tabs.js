import { modalAppearAnimation, modalDisappearAnimation } from "./helpers";
import { repairTypesSliderFunc } from "./repair-types-slider";

export const tabsFunc = (tabsClass, tabsContentClass) => {
  const tabsParent = document.querySelector(tabsClass);
  const tabsButtons = tabsParent.querySelectorAll('button');
  const tabsContentParent = document.querySelector(tabsContentClass);
  const tabsContentElements = tabsContentParent.querySelectorAll(`${tabsContentClass} > div`);

  tabsParent.addEventListener('click', (evt) => {
    if (!evt.target.closest('button')) return;

    const tabNumber = evt.target.dataset.order;

    tabsButtons.forEach(tab => tab.classList.remove('active'));
    evt.target.classList.add('active');

    tabsContentElements.forEach((contentElem, idx) => {
      if (!contentElem.classList.contains('hide')) {
        modalDisappearAnimation(contentElem);
        setTimeout(() => contentElem.classList.add('hide'), 0);
      }
      if (idx === (+tabNumber - 1)) {
        setTimeout(() => modalAppearAnimation(contentElem), 0);
        setTimeout(() => contentElem.classList.remove('hide'), 0);
        setTimeout(() =>
          repairTypesSliderFunc(
            '.repair-types-slider-wrap', `.types-repair${tabNumber} .repair-types-slider__slide`
          ), 0);
      }
    });
  })
}
