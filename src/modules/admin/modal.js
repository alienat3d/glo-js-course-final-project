import { modalAppearAnimation, modalDisappearAnimation } from "../helpers";

export const modalFunc = () => {
  const addItemButton = document.querySelector('.btn-addItem');
  const modal = document.getElementById('modal');
  const closeButton = modal.querySelector('.button__close');

  addItemButton.addEventListener('click', () => {
    setTimeout(() => modal.classList.add('modal-opened'), 50);
    modalAppearAnimation(modal);
  });

  closeButton.addEventListener('click', () => {
    modalDisappearAnimation(modal);
    setTimeout(() => modal.classList.remove('modal-opened'), 200);
  });
}
