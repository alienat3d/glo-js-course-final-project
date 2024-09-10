export const formulaTooltipsFunc = () => {
  const formulaItems = document.querySelectorAll('.formula-item__icon');
  const formulaRow1 = document.querySelector('.formula-row-1');
  const formulaRow2 = document.querySelector('.formula-row-2');

  const switchZIndex = (row1, row2) => {
    row1.style.zIndex = '2';
    row2.style.zIndex = '1';
  }

  formulaItems.forEach(item => {
    item.addEventListener('mouseenter', (evt) => {
      if (item.getBoundingClientRect().top < 165) item.classList.add('upside-down');
      if (
        evt.target.closest('.formula-row-1') &&
        item.getBoundingClientRect().top < 195
      ) item.classList.add('upside-down');
      if (
        evt.target.closest('.formula-row-2') &&
        item.getBoundingClientRect().top < 225
      ) item.classList.add('upside-down');
      // == Чтобы пофиксить баг с прозрачными подсказками из-за разницы слоёв ==
      evt.target.closest('.formula-row-1') ?
        switchZIndex(formulaRow1, formulaRow2) :
        switchZIndex(formulaRow2, formulaRow1);
      // == / ==
      item.classList.add('active-item');
    });
    item.addEventListener('mouseleave', () => item.classList.remove('active-item', 'upside-down'));
  });
}
