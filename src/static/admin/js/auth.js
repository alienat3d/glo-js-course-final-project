'use strict';

const currentURL = window.location.pathname;
const currentHost = window.location.host;

if (currentURL === '/admin/index.html' || currentURL === '/admin/') {
  const usernameInput = document.querySelector('#username');
  const usernameWarning = usernameInput.nextElementSibling;
  const passwordInput = document.querySelector('#password');
  const passwordWarning = passwordInput.nextElementSibling;
  const submitButton = document.querySelector('button[type=submit]');

  const adminCredentials = {
    username: 'admin',
    password: 'a123'
  }

  let isAuth = false;

  let usernameInputValue;
  let passwordInputValue;

  const getCookie = () => {
    return document.cookie.split('; ').reduce((acc, item) => {
      const [name, value] = item.split('=')
      acc[name] = value
      return acc
    }, {})
  }

  const cookie = getCookie();

  const checkCredentials = () => {
    switch (true) {
      case usernameInputValue !== adminCredentials.username &&
        passwordInputValue !== adminCredentials.password:
        usernameWarning.classList.remove('hidden');
        passwordWarning.classList.remove('hidden');
        usernameInput.value = '';
        passwordInput.value = '';
        break;
      case usernameInputValue !== adminCredentials.username:
        usernameWarning.classList.remove('hidden');
        usernameInput.value = '';
        break;
      case passwordInputValue !== adminCredentials.password:
        passwordWarning.classList.remove('hidden');
        passwordInput.value = '';
        break;
      case usernameInputValue === adminCredentials.username &&
        passwordInputValue === adminCredentials.password:
        document.cookie = `auth=true;samesite=strict;max-age=2678400`;
        isAuth = true;
        window.location.href = `http://${currentHost}/admin/table.html`;
        break;
      default:
        console.warn('Что-то пошло не так...');
        break;
    }
  }

  if (cookie.auth === 'true') isAuth = true;

  if (currentURL === '/admin/table.html' && !isAuth) {
    window.location.href = `http://${currentHost}/admin/index.html`;
  }

  if (currentURL === '/admin/index.html' || currentURL === '/admin/' && isAuth) {
    window.location.href = `http://${currentHost}/admin/table.html`;
  }

  usernameInput.addEventListener('input', (evt) => {
    if (!usernameWarning.classList.contains('hidden')) {
      usernameWarning.classList.add('hidden');
    }
    return usernameInputValue = evt.target.value;
  })

  passwordInput.addEventListener('input', (evt) => {
    if (!passwordWarning.classList.contains('hidden')) {
      passwordWarning.classList.add('hidden');
    }
    return passwordInputValue = evt.target.value;
  })

  submitButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    checkCredentials();
  })
}
