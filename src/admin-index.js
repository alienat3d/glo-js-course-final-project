import { authFunc } from "./modules/admin/auth";
import { renderContentFunc } from "./modules/admin/render-content";
import { getCookie } from "./modules/helpers";

const currentURL = window.location.pathname;
const currentHost = window.location.host;
const cookie = getCookie();

let isAuth = false;

if (cookie.auth === 'true') isAuth = true;

if (currentURL === '/admin') window.location.href = `http://${currentHost}/admin/index.html`;

if ((currentURL === '/admin/index.html' || currentURL === '/admin/') && isAuth) {
  window.location.href = `http://${currentHost}/admin/table.html`;
}

if (currentURL === '/admin/index.html' || currentURL === '/admin/') {
  authFunc();
} else {
  renderContentFunc();
}
