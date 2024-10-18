import { getData } from "../helpers";

export const authFunc = () => {
  const SERVER_URL = '../db/db.json';
  const currentURL = window.location.pathname;
  const currentHost = window.location.host;

  if (currentURL === '/admin/index.html' || currentURL === '/admin/') {
    const usernameInput = document.querySelector('#username');
    const usernameWarning = usernameInput.nextElementSibling;
    const passwordInput = document.querySelector('#password');
    const passwordWarning = passwordInput.nextElementSibling;
    const submitButton = document.querySelector('button[type=submit]');

    let isLoginCorrect = false;
    let isAuth = false;

    let usernameInputValue;
    let passwordInputValue;

    const checkUsernames = (data) => {
      if (data.users[0].login === usernameInputValue) {
        isLoginCorrect = true;
      } else {
        usernameWarning.classList.remove('hidden');
        usernameInput.value = '';
      };
    }

    const checkPasswords = (data) => {
      if (data.users[0].password === passwordInputValue && isLoginCorrect) {
        document.cookie = `auth=true;samesite=strict;max-age=86400000`;
        isAuth = true;
        window.location.href = `http://${currentHost}/admin/table.html`;
      } else {
        passwordWarning.classList.remove('hidden');
        passwordInput.value = '';
      };
    }

    const getCookie = () => {
      return document.cookie.split('; ').reduce((acc, item) => {
        const [name, value] = item.split('=')
        acc[name] = value
        return acc
      }, {})
    }

    const cookie = getCookie();

    const checkCredentials = () => {
      getData(SERVER_URL).then((data) => checkUsernames(data));
      getData(SERVER_URL).then((data) => checkPasswords(data));
    }

    if (cookie.auth === 'true') isAuth = true;

    if (currentURL === '/admin/table.html' && !isAuth) {
      window.location.href = `http://${currentHost}/admin/index.html`;
    }

    if ((currentURL === '/admin/index.html' || currentURL === '/admin/') && isAuth) {
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
}
