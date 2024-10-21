import {
  modalAppearAnimation,
  modalDisappearAnimation,
  getData,
  saveData,
  generateId
} from "../helpers";

export const tableFunc = () => {
  const SERVER_URL = 'http://localhost:4545/works';

  const contentContainer = document.getElementById('tbody');
  const selectType = document.getElementById('typeItem');
  const addItemButton = document.querySelector('.btn-addItem');
  const modal = document.getElementById('modal');
  const closeButton = modal.querySelector('.button__close');
  const modalInputs = modal.querySelectorAll('input');
  const saveButton = modal.querySelector('.button-ui_firm');
  const modalHeading = modal.querySelector('.modal__header');

  let editItemButtons;
  let currentItemId;
  let isEdit = false;

  const modalTitlesArray = ['Добавить новую услугу', 'Редактировать услугу'];
  const modalButtonTextArray = ['Добавить новую услугу', 'Редактировать услугу'];

  const newWorkObject = {
    type: '',
    name: '',
    units: '',
    cost: 0,
    id: 0,
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

    editItemButtons = document.querySelectorAll('.action-change');
  }

  const renderOptions = (data) => {
    const types = new Set();
    data.forEach(obj => types.add(obj.type));
    types.forEach(type => {
      selectType.insertAdjacentHTML('beforeend', `
        <option value="${type}">${type}</option>
      `);
    });
  }

  const openModal = () => {
    setTimeout(() => modal.classList.add('modal-opened'), 50);
    modalAppearAnimation(modal);
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

  const editWork = (id) => {
    console.log(id);
  }

  const clearForm = () => {
    modalInputs[0].value = '';
    modalInputs[1].value = '';
    modalInputs[2].value = '';
    modalInputs[3].value = '';
  }

  addItemButton.addEventListener('click', () => {
    modalHeading.textContent = modalTitlesArray[0];
    saveButton.textContent = modalButtonTextArray[0];
    setTimeout(openModal, 10);
  });

  closeButton.addEventListener('click', () => {
    closeModal();
    setTimeout(clearForm, 210);
  });

  saveButton.addEventListener('click', (evt) => {
    evt.preventDefault();

    isEdit ? editWork(currentItemId) : saveNewWork();

    clearForm();

    setTimeout(() => getData(SERVER_URL)
      .then((data) => renderContent(data, selectType.value)), 0);
  });

  setTimeout(() => editItemButtons.forEach(button => {
    button.addEventListener('click', (evt) => {
      isEdit = true;
      const tgt = evt.target;
      modalHeading.textContent = modalTitlesArray[1];
      saveButton.textContent = modalButtonTextArray[1];
      currentItemId = tgt.closest('.table__row').querySelector('.table__id').textContent;
      fillFormFromDB(currentItemId);
      openModal();
    })
  }), 200);

  const fillFormFromDB = (id) => {
    getData(`${SERVER_URL}/${id}`).then((data) => {
      modalInputs[0].value = data.type;
      modalInputs[1].value = data.name;
      modalInputs[2].value = data.units;
      modalInputs[3].value = data.cost;
    });
  }

  getData(SERVER_URL).then((data) => renderContent(data));
  getData(SERVER_URL).then((data) => renderOptions(data))
    .then(selectType.addEventListener('change', (evt) => {
      const type = evt.target.value;
      getData(SERVER_URL).then((data) => renderContent(data, type));
    }));
}
