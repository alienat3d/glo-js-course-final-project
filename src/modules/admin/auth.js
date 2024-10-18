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

    // todo Надо сделать так, чтобы только при совпадении логина и пароля из одного и того же объекта проверка пропускала.
    const checkUsernames = (data) => {
      data['users'].forEach(obj => {
        if (obj['login'] === usernameInputValue) isLoginCorrect = true;
      });
    }

    const checkPasswords = (data) => {
      data['users'].forEach(obj => {
        if (obj['password'] === passwordInputValue) isPasswordCorrect = true;
      });
    }

    let isLoginCorrect = false;
    let isPasswordCorrect = false;
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
      getData(SERVER_URL).then((data) => checkUsernames(data));
      getData(SERVER_URL).then((data) => checkPasswords(data));

      if (isLoginCorrect && isPasswordCorrect) {
        console.log('Logged in!');
        // document.cookie = `auth=true;samesite=strict;max-age=2678400`;
        // isAuth = true;
        // window.location.href = `http://${currentHost}/admin/table.html`;
      } else if (!isLoginCorrect && !isPasswordCorrect) {
          usernameWarning.classList.remove('hidden');
          passwordWarning.classList.remove('hidden');
          usernameInput.value = '';
          passwordInput.value = '';
      } else if (!isLoginCorrect) {
        usernameWarning.classList.remove('hidden');
        usernameInput.value = '';
      } else if (!isPasswordCorrect) {
        passwordWarning.classList.remove('hidden');
        passwordInput.value = '';
      }

      /* switch (true) {
        case getData(SERVER_URL).then((data) =>
          checkObjectValues(data, 'login', usernameInputValue)) &&
          getData(SERVER_URL).then((data) =>
            checkObjectValues(data, 'password', passwordInputValue)):
          document.cookie = `auth=true;samesite=strict;max-age=2678400`;
          isAuth = true;
          window.location.href = `http://${currentHost}/admin/table.html`;
          break;
        case getData(SERVER_URL).then((data) =>
          checkObjectValues(data, 'login', usernameInputValue)):
          usernameWarning.classList.remove('hidden');
          usernameInput.value = '';
          break;
        case getData(SERVER_URL).then((data) =>
          checkObjectValues(data, 'password', passwordInputValue)):
          passwordWarning.classList.remove('hidden');
          passwordInput.value = '';
          break;
        default:
          // usernameWarning.classList.remove('hidden');
          // passwordWarning.classList.remove('hidden');
          // usernameInput.value = '';
          // passwordInput.value = '';
          break;
      } */
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
}
