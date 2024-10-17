'use strict';

const currentURL = window.location.pathname;
const currentHost = window.location.host;

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
    default:
      isAuth = true;
      window.location.href = `http://${currentHost}/admin/table.html`;
      break;
  }
}

if (currentURL === '/admin/table.html' && !isAuth) {
  window.location.href = `http://${currentHost}/admin/index.html`;
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
