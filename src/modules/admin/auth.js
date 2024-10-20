import { getData } from "../helpers";

export const authFunc = () => {
  const SERVER_URL = 'http://localhost:4545/users';
  const currentHost = window.location.host;

  const usernameInput = document.querySelector('#username');
  const usernameWarning = usernameInput.nextElementSibling;
  const passwordInput = document.querySelector('#password');
  const passwordWarning = passwordInput.nextElementSibling;
  const submitButton = document.querySelector('button[type=submit]');

  let isLoginCorrect = false;
  let usernameInputValue;
  let passwordInputValue;

  const checkUsernames = (data) => {
    if (data[0].login === usernameInputValue) {
      isLoginCorrect = true;
    } else {
      usernameWarning.classList.remove('hidden');
      usernameInput.value = '';
    };
  }

  const checkPasswords = (data) => {
    if (data[0].password === passwordInputValue && !isLoginCorrect) {
      return;
    } else if (data[0].password === passwordInputValue && isLoginCorrect) {
      document.cookie = `auth=true;samesite=strict;max-age=25920`;
      window.location.href = `http://${currentHost}/admin/table.html`;
    } else {
      passwordWarning.classList.remove('hidden');
      passwordInput.value = '';
    };
  }

  const checkCredentials = () => {
    getData(SERVER_URL).then((data) => checkUsernames(data));
    getData(SERVER_URL).then((data) => checkPasswords(data));
  }

  usernameInput.addEventListener('input', (evt) => {
    isLoginCorrect = false;
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
