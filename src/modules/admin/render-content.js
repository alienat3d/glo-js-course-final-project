import { getData } from "../helpers";

export const renderContentFunc = () => {
  const SERVER_URL = 'http://localhost:4545/works';

  const contentContainer = document.getElementById('tbody');
  const selectType = document.getElementById('typeItem');

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

  const renderOptions = (data) => {
    const types = new Set();
    data.forEach(obj => types.add(obj.type));
    types.forEach(type => {
      selectType.insertAdjacentHTML('beforeend', `
        <option value="${type}">${type}</option>
      `);
    });
  }

  getData(SERVER_URL).then((data) => renderContent(data));
  getData(SERVER_URL).then((data) => renderOptions(data))
    .then(selectType.addEventListener('change', (evt) => {
      const type = evt.target.value;
      getData(SERVER_URL).then((data) => renderContent(data, type));
    }));
}
