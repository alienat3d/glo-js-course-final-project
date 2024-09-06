import { toggleActiveClass } from "./helpers";

export const headerMenuRolloutFunc = () => {
  const navMenuButton = document.querySelector('.menu');
  const navMenuBlock = document.querySelector('.popup-dialog-menu');
  const closeMenuButton = navMenuBlock.querySelector('.close-menu');

  navMenuButton.addEventListener('click', () =>
    toggleActiveClass(navMenuBlock, 'showHide-menu'));
  closeMenuButton.addEventListener('click', () =>
    toggleActiveClass(navMenuBlock, 'showHide-menu'));
}
