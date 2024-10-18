const toggleActiveClass = (element, className) => element.classList.toggle(className);

const measureWindowWidth = () => document.documentElement.clientWidth;

const modalAppearAnimation = (modal) => {
  let counter = 0;
  const step = () => {
    if (counter < 10) {
      modal.style.visibility = 'visible';
      modal.style.opacity = `0.${counter++}`;
      requestAnimationFrame(step);
    } else {
      modal.style.opacity = 1;
    }
  };
  requestAnimationFrame(step);
};

const modalDisappearAnimation = (modal) => {
  let counter = 9;
  const step = () => {
    if (counter > 0) {
      modal.style.opacity = `0.${counter--}`;
      requestAnimationFrame(step);
    } else {
      modal.style.opacity = 0;
      modal.style.visibility = 'hidden';
    }
  };
  requestAnimationFrame(step);
};

const phoneSymbolsOnly = (input) =>
  input.value = input.value.replace(/[^\d]+/g, '')
    .replace(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/, '+$1 ($2) $3-$4-$5');

const getData = (url) => {
  return fetch(url)
    .then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        throw new Error("Произошла ошибка, данные не были найдены!");
      }
    })
    .catch(error => console.warn(error));
}

export {
  toggleActiveClass,
  measureWindowWidth,
  phoneSymbolsOnly,
  modalAppearAnimation,
  modalDisappearAnimation,
  getData
};
