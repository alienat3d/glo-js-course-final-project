import { toggleActiveClass, modalAppearAnimation, modalDisappearAnimation } from "./helpers";

export const servicesPopupFunc = () => {
  const navMenuBlock = document.querySelector('.popup-dialog-menu');
  const headerNavMenuServicesButton = navMenuBlock.querySelector('.menu-link.no-overflow');
  const repairTypesServicesButton = document.querySelector('.repair-types-tab a');
  const repairTypesPopup = document.querySelector('.popup.popup-repair-types');
  const popupCloseButton = repairTypesPopup.querySelector('.close');

  headerNavMenuServicesButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    toggleActiveClass(navMenuBlock, 'showHide-menu');
    modalAppearAnimation(repairTypesPopup);
  });

  repairTypesServicesButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    modalAppearAnimation(repairTypesPopup);
  });

  popupCloseButton.addEventListener('click', () => {
    modalDisappearAnimation(repairTypesPopup);
  });
}
