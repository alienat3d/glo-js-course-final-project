import { modalAppearAnimation, modalDisappearAnimation, saveData } from "../helpers";

export const modalFunc = () => {
  const SERVER_URL = 'http://localhost:4545/works';

  const addItemButton = document.querySelector('.btn-addItem');
  const modal = document.getElementById('modal');
  const closeButton = modal.querySelector('.button__close');
  const modalInputs = modal.querySelectorAll('input');
  const saveButton = modal.querySelector('.button-ui_firm');

  const newWorkObject = {
    type: '',
    name: '',
    units: '',
    cost: 0
  }

  const saveNewWork = () => {
    newWorkObject.type = modalInputs[0].value;
    newWorkObject.name = modalInputs[1].value;
    newWorkObject.units = modalInputs[2].value;
    newWorkObject.cost = +modalInputs[3].value;
    saveData(SERVER_URL, 'POST', newWorkObject);
  };

  addItemButton.addEventListener('click', () => {
    setTimeout(() => modal.classList.add('modal-opened'), 50);
    modalAppearAnimation(modal);
  });

  closeButton.addEventListener('click', () => {
    modalDisappearAnimation(modal);
    setTimeout(() => modal.classList.remove('modal-opened'), 200);
  });

  saveButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    saveNewWork();
  });
}
