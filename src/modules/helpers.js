const toggleActiveClass = (element, className) => element.classList.toggle(className);

const measureWindowWidth = () => document.documentElement.clientWidth;

const phoneSymbolsOnly = () => {
	const regExp = /[^\d\(\)\-]+/g;
}

export { toggleActiveClass, measureWindowWidth };
