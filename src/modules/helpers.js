const toggleActiveClass = (element, className) => element.classList.toggle(className);

const measureWindowWidth = () => document.documentElement.clientWidth;

const phoneSymbolsOnly = (input) => input.value = input.value.replace(/[^\d]+/g, '')
  .replace(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/, '+$1 ($2) $3-$4-$5');

export { toggleActiveClass, measureWindowWidth, phoneSymbolsOnly };
