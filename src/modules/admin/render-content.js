import { getData } from "../helpers";

export const renderContentFunc = () => {
  const SERVER_URL = '../db/db.json';
  const contentContainer = document.getElementById('tbody');

  getData(SERVER_URL).then((data) => renderContent(data));

  const renderContent = (data, currentType) => {
    contentContainer.innerHTML = '';

    data['works'].forEach(obj => {
      // if (obj.type === currentType) {
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
      // }
    });
  }
}
