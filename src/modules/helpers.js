const toggleActiveClass = (element, className) => element.classList.toggle(className);

const measureWindowWidth = () => document.documentElement.clientWidth;

const modalAppearAnimation = (modal) => {
  let counter = 0;
  const step = () => {
    if (counter < 10) {
      modal.style.visibility = 'visible';
      modal.style.opacity = `0.${counter++}`;
      requestAnimationFrame(step);
    } else {
      modal.style.opacity = 1;
    }
  };
  requestAnimationFrame(step);
};

const modalDisappearAnimation = (modal) => {
  let counter = 9;
  const step = () => {
    if (counter > 0) {
      modal.style.opacity = `0.${counter--}`;
      requestAnimationFrame(step);
    } else {
      modal.style.opacity = 0;
      modal.style.visibility = 'hidden';
    }
  };
  requestAnimationFrame(step);
};

const phoneSymbolsOnly = (input) =>
  input.value = input.value.replace(/[^\d]+/g, '')
    .replace(/^(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})$/, '+$1 ($2) $3-$4-$5');

const getData = (url, method) => {
  return fetch(url, { method })
    .then(res => {
      if (res.status === 200) {
        return res.json();
      } else {
        throw new Error("Произошла ошибка, данные не были найдены!");
      }
    })
    .catch(error => console.warn(error));
}

const saveData = (url, method, obj) => {
  return fetch(url, {
    method: method,
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(res => {
      if (res.status === 201) {
        return res.json();
      } else {
        throw new Error("Произошла ошибка, данные не были сохранены!");
      }
    })
    .catch(error => {
      console.warn(error);
    });
}

const getCookie = () => {
  return document.cookie.split('; ').reduce((acc, item) => {
    const [name, value] = item.split('=')
    acc[name] = value
    return acc
  }, {})
}

const generateId = () => {
  let numbersString = (Math.floor(Math.random() * (9 - 0 + 1)) + 0).toString();
  for (let index = 0; index < 9; index++) {
    numbersString += (Math.floor(Math.random() * (9 - 0 + 1)) + 0).toString();
  }
  return numbersString;
}

export {
  toggleActiveClass,
  measureWindowWidth,
  phoneSymbolsOnly,
  modalAppearAnimation,
  modalDisappearAnimation,
  getData,
  saveData,
  getCookie,
  generateId
};
