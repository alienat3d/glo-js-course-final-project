import { measureWindowWidth, modalAppearAnimation, modalDisappearAnimation } from "./helpers";

export const servicesPopupRenderContentFunc = () => {
  const SERVER_URL = './db/db.json';
  const dayMilliseconds = 24 * 60 * 60 * 1000;
  const windowWidth = measureWindowWidth();

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
    navSidebarContainer.innerHTML = '';
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
    contentContainer.innerHTML = '';
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
      type = tgt.textContent;
      serviceTypeTitle.textContent = tgt.textContent;
      getData().then((data) => renderContent(data, type));
    }
  });

  if (windowWidth < 1008) {
    const navWrapper = document.querySelector('.popup-repair-types .nav-wrap');

    let currentSlide = 0;

    const prevNavSlide = (elems, idx, hideClass, activeClass) => {
      modalDisappearAnimation(elems[idx]);
      elems[idx].classList.add(hideClass);
      elems[idx].classList.remove(activeClass);
    };

    const nextNavSlide = (elems, idx, hideClass, activeClass) => {
      elems[idx].classList.add(activeClass);
      elems[idx].classList.remove(hideClass);
      modalAppearAnimation(elems[idx]);
    };

    setTimeout(() => {
      const navButtons = navSidebarContainer.querySelectorAll('.button_o');

      navButtons.forEach(button => {
        if (!button.classList.contains('active')) button.classList.add('hide');
      });

      navWrapper.addEventListener('click', (evt) => {
        if (!evt.target.matches('.nav-arrow')) return;

        prevNavSlide(navButtons, currentSlide, 'hide', 'active');

        if (evt.target.closest('#nav-arrow-popup-repair_left')) {
          currentSlide--;
        } else if (evt.target.closest('#nav-arrow-popup-repair_right')) {
          currentSlide++;
        }
        if (currentSlide >= navButtons.length) currentSlide = 0;
        if (currentSlide < 0) currentSlide = navButtons.length - 1;

        navButtons.forEach(button => {
          if (button.classList.contains('active')) type = button.textContent;
        });

        nextNavSlide(navButtons, currentSlide, 'hide', 'active');

        navButtons.forEach(button => {
          if (button.classList.contains('active')) type = button.textContent;
        });
        serviceTypeTitle.textContent = type;
        getData().then((data) => renderContent(data, type));
      });
    }, 500);
  }
}
