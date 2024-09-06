import { toggleActiveClass } from "./helpers";

export const headerPhonesAccordionFunc = () => {
	const contactsBlock = document.querySelector('.header-contacts');
	const accordionBlock = document.querySelector('.header-contacts__phone-number-accord');
	const arrowButton = document.querySelector('.header-contacts__arrow');

	contactsBlock.addEventListener('click', (evt) => {
    if (evt.target.closest('.header-contacts__arrow')) {
      toggleActiveClass(accordionBlock, 'header-accord-active');
      toggleActiveClass(arrowButton, 'header-contacts__arrow--active');
    }
	});
}
