import { servicesPopupRenderContentFunc } from "./services-popup-render-content";
import { toggleActiveClass, modalAppearAnimation, modalDisappearAnimation } from "./helpers";

export const servicesPopupFunc = () => {
  const navMenuBlock = document.querySelector('.popup-dialog-menu');
  const headerNavMenuServicesButtons = document.querySelectorAll('.menu-link.no-overflow');
  const repairTypesServicesButton = document.querySelector('.repair-types-tab a');
  const repairTypesServicesButtonMobile = document.querySelector('.link-list-repair a');
  const repairTypesPopup = document.querySelector('.popup-repair-types');

  const buttonsToOpenPopup = [ repairTypesServicesButton, repairTypesServicesButtonMobile ];

  headerNavMenuServicesButtons.forEach(button => {
    button.addEventListener('click', (evt) => {
      evt.preventDefault();
      toggleActiveClass(navMenuBlock, 'showHide-menu');
      servicesPopupRenderContentFunc();
      modalAppearAnimation(repairTypesPopup);
    });
  });

  buttonsToOpenPopup.forEach(button =>
    button.addEventListener('click', (evt) => {
      evt.preventDefault();
      servicesPopupRenderContentFunc();
      modalAppearAnimation(repairTypesPopup);
    })
  );

  repairTypesPopup.addEventListener('click', (evt) => {
    const tgt = evt.target;
    if (tgt.matches('.popup-repair-types') || tgt.matches('.close')) {
      modalDisappearAnimation(repairTypesPopup);
    }
  });
}
