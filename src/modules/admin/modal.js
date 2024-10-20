import {
  modalAppearAnimation,
  modalDisappearAnimation,
  getData,
  saveData,
  generateId
} from "../helpers";

export const modalFunc = () => {
  const SERVER_URL = 'http://localhost:4545/works';

  const contentContainer = document.querySelector('tbody');
  const addItemButton = document.querySelector('.btn-addItem');
  const modal = document.getElementById('modal');
  const closeButton = modal.querySelector('.button__close');
  const modalInputs = modal.querySelectorAll('input');
  const saveButton = modal.querySelector('.button-ui_firm');

  const newWorkObject = {
    type: '',
    name: '',
    units: '',
    cost: 0,
    id: 0,
  }

  const closeModal = () => {
    modalDisappearAnimation(modal);
    setTimeout(() => modal.classList.remove('modal-opened'), 200);
  }

  const saveNewWork = () => {
    newWorkObject.id = generateId();
    newWorkObject.type = modalInputs[0].value;
    newWorkObject.name = modalInputs[1].value;
    newWorkObject.units = modalInputs[2].value;
    newWorkObject.cost = +modalInputs[3].value;
    saveData(SERVER_URL, 'POST', newWorkObject);
  };

  const clearForm = () => {
    modalInputs[0].value = '';
    modalInputs[1].value = '';
    modalInputs[2].value = '';
    modalInputs[3].value = '';
  }

  const renderTable = (obj) => {
    contentContainer.insertAdjacentHTML('beforeend', `
      <tr class="table__row">
        <td class="table__id table__cell">${obj.id}</td>
        <td class="table-type table__cell">${obj.type}</td>
        <td class="table-name table__cell">${obj.name}</td>
        <td class="table-units table__cell">${obj.units}</td>
        <td class="table-cost table__cell">${obj.cost}</td>
        <td>
          <div class="table__actions table__cell">
            <button class="button action-change">
              <span class="svg_ui">
                <svg class="action-icon_change">
                  <use xlink:href="./images/sprite.svg#change"></use>
                </svg>
              </span>
              <span>Изменить</span>
            </button>
            <button class="button action-remove">
              <span class="svg_ui">
                <svg class="action-icon_remove">
                  <use xlink:href="./images/sprite.svg#remove"></use>
                </svg>
              </span>
              <span>Удалить</span>
            </button>
          </div>
        </td>
      </tr>
    `)
  }

  const renderContent = (data, currentType = 'Все услуги') => {
    contentContainer.innerHTML = '';

    if (currentType === 'Все услуги') {
      data.forEach(obj => renderTable(obj));
    } else {
      data.forEach(obj => {
        if (obj.type === currentType) renderTable(obj);
      });
    }
  }

  addItemButton.addEventListener('click', () => {
    setTimeout(() => modal.classList.add('modal-opened'), 50);
    modalAppearAnimation(modal);
  });

  closeButton.addEventListener('click', closeModal);

  saveButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    saveNewWork();
    clearForm();
    getData(SERVER_URL).then((data) => renderContent(data));
  });
}
