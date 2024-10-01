import { modalAppearAnimation, modalDisappearAnimation } from './helpers';

export const thankPopupFunc = () => {
  const popup = document.querySelector('.popup-thank');

  modalAppearAnimation(popup);

  popup.addEventListener('click', (evt) => {
    const tgt = evt.target;
    if (tgt.matches('.popup-thank') || tgt.matches('.close')) modalDisappearAnimation(popup);
  })
}
