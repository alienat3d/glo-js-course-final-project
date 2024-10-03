export const servicesPopupRenderContentFunc = () => {
  const SERVER_URL = './db/db.json';
  const dayMilliseconds = 24 * 60 * 60 * 1000;

  const navSidebarContainer = document.querySelector('.nav-list-popup-repair');
  const serviceTypeTitle = document.querySelector('.popup-repair-types-content__head-title');
  const dateBlock = document.querySelector('.popup-repair-types-content__head-date span');
  const contentContainer = document.querySelector('.popup-repair-types-content-table__list tbody');

  let date = new Date();
  let activeButton;
  let type;

  const getData = () => {
    return fetch(SERVER_URL)
      .then(res => {
        if (res.status === 200) {
          return res.json();
        } else {
          throw new Error("Произошла ошибка, данные не были найдены!");
        }
      })
      .catch(error => console.warn(error));
  }

  const renderSidebar = (data) => {
    const types = new Set();
    data.forEach(obj => types.add(obj.type));

    types.forEach(type =>
      navSidebarContainer.insertAdjacentHTML('beforeend', `
        <button class="button_o popup-repair-types-nav__item">${type}</button>
      `)
    );

    activeButton = navSidebarContainer.querySelector('.popup-repair-types-nav__item');
    activeButton.classList.add('active');

    serviceTypeTitle.textContent = activeButton.textContent;
  }

  const renderContent = (data, currentType) => {
    data.forEach(obj => {
      if (obj.type === currentType) {
        contentContainer.insertAdjacentHTML('beforeend', `
          <tr class="mobile-row showHide">
            <td class="repair-types-name">${obj.name}</td>
            <td class="mobile-col-title tablet-hide desktop-hide">Ед.измерения</td>
            <td class="mobile-col-title tablet-hide desktop-hide">Цена за ед.</td>
            <td class="repair-types-value">${obj.units}</td>
            <td class="repair-types-value">${obj.cost} руб.</td>
          </tr>
        `)
      }
    });
  }

  getData().then((data) => renderSidebar(data));

  getData().then((data) => {
    type = data[0].type;
    renderContent(data, type);
  });

  date.setTime(date.getTime() - dayMilliseconds);

  dateBlock.textContent = new Intl.DateTimeFormat('ru',
    { year: 'numeric', month: 'long', day: 'numeric' })
    .format(date);

  navSidebarContainer.addEventListener('click', (evt) => {
    const tgt = evt.target;
    if (tgt.matches('.button_o') && !tgt.matches('.active')) {
      const buttons = navSidebarContainer.querySelectorAll('.button_o');
      buttons.forEach(button => {
        if (button.classList.contains('active')) button.classList.remove('active');
      });
      tgt.classList.add('active');
      contentContainer.innerHTML = '';
      type = tgt.textContent;
      serviceTypeTitle.textContent = tgt.textContent;
      getData().then((data) => renderContent(data, type));
    }
  })
}
