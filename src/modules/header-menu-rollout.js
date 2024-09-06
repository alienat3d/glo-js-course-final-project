import { toggleActiveClass, measureWindowWidth } from "./helpers";

export const headerMenuRolloutFunc = () => {
  const windowWidth = measureWindowWidth();

  const navMenuButton = document.querySelector('.menu');
  const navMenuBlock = document.querySelector('.popup-dialog-menu');
  const closeMenuButton = navMenuBlock.querySelector('.close-menu');

  if (windowWidth < 576) {
    navMenuButton.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('menu__icon')) toggleActiveClass(navMenuBlock, 'showHide-menu')
    })
  } else {
    navMenuButton.addEventListener('click', () =>
      toggleActiveClass(navMenuBlock, 'showHide-menu'));
  }

  closeMenuButton.addEventListener('click', () =>
    toggleActiveClass(navMenuBlock, 'showHide-menu'));
}
