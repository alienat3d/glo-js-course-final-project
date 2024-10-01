export const servicesPopupRenderContentFunc = () => {
  const SERVER_URL = './db/db.json';
  const date = new Date();

  const navSidebarContainer = document.querySelector('.nav-list-popup-repair');
  const serviceTypeTitle = document.querySelector('.popup-repair-types-content__head-title');
  const dateBlock = document.querySelector('.popup-repair-types-content__head-date span');

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
    const activeButton = navSidebarContainer.querySelector('.popup-repair-types-nav__item');
    activeButton.classList.add('active');
    serviceTypeTitle.textContent = activeButton.textContent;
  }

  getData().then((data) => renderSidebar(data));

  dateBlock.textContent = new Intl.DateTimeFormat('ru',
    { year: 'numeric', month: 'long', day: 'numeric' })
      .format(date);
}
