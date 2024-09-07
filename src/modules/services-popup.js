import { toggleActiveClass } from "./helpers";

export const servicesPopupFunc = () => {
  const navMenuBlock = document.querySelector('.popup-dialog-menu');
  const headerNavMenuServicesButton = navMenuBlock.querySelector('.menu-link.no-overflow');
  const repairTypesServicesButton = document.querySelector('.repair-types-tab a');
  const repairTypesPopup = document.querySelector('.popup.popup-repair-types');
  const popupCloseButton = repairTypesPopup.querySelector('.close');

  let count = 0;
  let idInterval;

  const modalAppearAnimation = () => {
    idInterval = requestAnimationFrame(modalAppearAnimation);
    if (count < 10) {
      repairTypesPopup.style.visibility = 'visible';
      repairTypesPopup.style.opacity = `0.${count++}`;
    } else {
      count = 10;
      repairTypesPopup.style.opacity = 1;
      cancelAnimationFrame(idInterval);
    }
  }

  const modalDisappearAnimation = () => {
    idInterval = requestAnimationFrame(modalDisappearAnimation);
    if (count > 0) {
      repairTypesPopup.style.opacity = `0.${count--}`;
    } else {
      repairTypesPopup.style.opacity = 0;
      repairTypesPopup.style.visibility = 'hidden';
      cancelAnimationFrame(idInterval);
    }
  }

  headerNavMenuServicesButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    toggleActiveClass(navMenuBlock, 'showHide-menu');
    modalAppearAnimation();
  });

  repairTypesServicesButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    modalAppearAnimation();
  });

  popupCloseButton.addEventListener('click', modalDisappearAnimation);
}
