export const testFunc = () => {
  const leftBtn = document.querySelector('#repair-types-arrow_left');
  const rightBtn = document.querySelector('#repair-types-arrow_right');
  const wrapper = document.querySelector('.types-repair-slides');

  const hideWrapper = (evt) => {
    console.log(evt.target);
    wrapper.classList.toggle('hide');
  };

  rightBtn.addEventListener('click', hideWrapper);

  leftBtn.addEventListener('click', () => rightBtn.removeEventListener('click', hideWrapper));
}
