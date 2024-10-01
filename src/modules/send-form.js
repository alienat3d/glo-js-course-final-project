import { thankPopupFunc } from "./thank-popup";

export const sendFormFunc = () => {
  const forms = document.querySelectorAll('form');

  const validateInputs = (inputs) => {
    let success = true;

    inputs.forEach(input => {
      input.classList.remove('error');
      switch (input.name) {
        case 'name':
          if (
            input.value.length < 3 ||
            input.value === '' ||
            /[^А-Яа-яЁё\s]/g.test(input.value)
          ) input.classList.add('error');
          break;
        case 'phone':
          if (input.value.length !== 18) input.classList.add('error');
          break;
      }
      input.classList.contains('error') ?
        success = false :
        input.classList.remove('success');
    });

    return success;
  }

  const sendData = (data) => {
    return fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json());
  }

  const submitForm = (form) => {
    const formInputs = form.querySelectorAll('input');
    const formCheckbox = form.querySelector('input[type="checkbox"]');
    const formData = new FormData(form);
    const formBody = {};

    formData.forEach((value, key) => formBody[key] = value);

    if (validateInputs(formInputs) && formCheckbox.checked) {
      sendData(formBody)
        .then(() => {
          formInputs.forEach(input => input.value = '');
          formCheckbox.checked = false;
          thankPopupFunc();
        })
        .catch(error => console.warn(error.message));
    } else {
      console.warn('error');
    }
  }

  try {
    if (!forms) {
      throw new Error('Форм отправки не найдено');
    }
    forms.forEach(form => {
      form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        submitForm(form);
      })
    });
  } catch (error) {
    console.error(error.message);
  }
}
