import { changeActiveClass } from "./helpers";

export const headerPhonesAccordionFunc = () => {
	const contactsBlock = document.querySelector('.header-contacts');
	const accordionBlock = document.querySelector('.header-contacts__phone-number-accord');

	contactsBlock.addEventListener('click', (evt) => {
    if (evt.target.closest('.header-contacts__arrow')) changeActiveClass(accordionBlock, 'header-accord-active');
	});
}
