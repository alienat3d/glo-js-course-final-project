const toggleActiveClass = (element, className) => element.classList.toggle(className);

const measureWindowWidth = () => document.documentElement.clientWidth;

const modalAppearAnimation = (modal, id, counter) => {
  id = requestAnimationFrame(modalAppearAnimation);
  if (counter < 10) {
    modal.style.visibility = 'visible';
    modal.style.opacity = `0.${counter++}`;
  } else {
    counter = 10;
    modal.style.opacity = 1;
    cancelAnimationFrame(id);
  }
}

const modalDisappearAnimation = (modal, id, counter) => {
  id = requestAnimationFrame(modalDisappearAnimation);
  if (counter > 0) {
    modal.style.opacity = `0.${counter--}`;
  } else {
    modal.style.opacity = 0;
    modal.style.visibility = 'hidden';
    cancelAnimationFrame(id);
  }
}

const phoneSymbolsOnly = (input) => input.value = input.value.replace(/[^\d]+/g, '')
  .replace(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/, '+$1 ($2) $3-$4-$5');

export { toggleActiveClass, measureWindowWidth, phoneSymbolsOnly, modalAppearAnimation, modalDisappearAnimation };
