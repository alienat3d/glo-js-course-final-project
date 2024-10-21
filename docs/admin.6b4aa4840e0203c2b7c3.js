/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/admin-index.js":
/*!****************************!*\
  !*** ./src/admin-index.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _modules_helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/helpers */ \"./src/modules/helpers.js\");\n/* harmony import */ var _modules_admin_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/admin/auth */ \"./src/modules/admin/auth.js\");\n/* harmony import */ var _modules_admin_table__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/admin/table */ \"./src/modules/admin/table.js\");\n\n\n// import { renderContentFunc } from \"./modules/admin/render-content\";\n// import { modalFunc } from \"./modules/admin/modal\";\n\nvar currentURL = window.location.pathname;\nvar currentHost = window.location.host;\nvar cookie = (0,_modules_helpers__WEBPACK_IMPORTED_MODULE_0__.getCookie)();\nvar isAuth = false;\nif (cookie.auth === 'true') isAuth = true;\nif (currentURL === '/admin') window.location.href = \"http://\".concat(currentHost, \"/admin/index.html\");\nif ((currentURL === '/admin/index.html' || currentURL === '/admin/') && isAuth) {\n  window.location.href = \"http://\".concat(currentHost, \"/admin/table.html\");\n} else if (currentURL === '/admin/table.html' && !isAuth) {\n  window.location.href = \"http://\".concat(currentHost, \"/admin/index.html\");\n}\nif (currentURL === '/admin/index.html' || currentURL === '/admin/') {\n  (0,_modules_admin_auth__WEBPACK_IMPORTED_MODULE_1__.authFunc)();\n} else {\n  (0,_modules_admin_table__WEBPACK_IMPORTED_MODULE_2__.tableFunc)();\n  // renderContentFunc();\n  // modalFunc();\n}\n\n//# sourceURL=webpack://relax-live/./src/admin-index.js?");

/***/ }),

/***/ "./src/modules/admin/auth.js":
/*!***********************************!*\
  !*** ./src/modules/admin/auth.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authFunc: () => (/* binding */ authFunc)\n/* harmony export */ });\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers */ \"./src/modules/helpers.js\");\n\nvar authFunc = function authFunc() {\n  var SERVER_URL = 'http://localhost:4545/users';\n  var currentHost = window.location.host;\n  var usernameInput = document.querySelector('#username');\n  var usernameWarning = usernameInput.nextElementSibling;\n  var passwordInput = document.querySelector('#password');\n  var passwordWarning = passwordInput.nextElementSibling;\n  var submitButton = document.querySelector('button[type=submit]');\n  var isLoginCorrect = false;\n  var usernameInputValue;\n  var passwordInputValue;\n  var checkUsernames = function checkUsernames(data) {\n    if (data[0].login === usernameInputValue) {\n      isLoginCorrect = true;\n    } else {\n      usernameWarning.classList.remove('hidden');\n      usernameInput.value = '';\n    }\n    ;\n  };\n  var checkPasswords = function checkPasswords(data) {\n    if (data[0].password === passwordInputValue && !isLoginCorrect) {\n      return;\n    } else if (data[0].password === passwordInputValue && isLoginCorrect) {\n      document.cookie = \"auth=true;samesite=strict;max-age=25920\";\n      window.location.href = \"http://\".concat(currentHost, \"/admin/table.html\");\n    } else {\n      passwordWarning.classList.remove('hidden');\n      passwordInput.value = '';\n    }\n    ;\n  };\n  var checkCredentials = function checkCredentials() {\n    (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.getData)(SERVER_URL).then(function (data) {\n      return checkUsernames(data);\n    });\n    (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.getData)(SERVER_URL).then(function (data) {\n      return checkPasswords(data);\n    });\n  };\n  usernameInput.addEventListener('input', function (evt) {\n    isLoginCorrect = false;\n    if (!usernameWarning.classList.contains('hidden')) {\n      usernameWarning.classList.add('hidden');\n    }\n    return usernameInputValue = evt.target.value;\n  });\n  passwordInput.addEventListener('input', function (evt) {\n    if (!passwordWarning.classList.contains('hidden')) {\n      passwordWarning.classList.add('hidden');\n    }\n    return passwordInputValue = evt.target.value;\n  });\n  submitButton.addEventListener('click', function (evt) {\n    evt.preventDefault();\n    checkCredentials();\n  });\n};\n\n//# sourceURL=webpack://relax-live/./src/modules/admin/auth.js?");

/***/ }),

/***/ "./src/modules/admin/table.js":
/*!************************************!*\
  !*** ./src/modules/admin/table.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   tableFunc: () => (/* binding */ tableFunc)\n/* harmony export */ });\n/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers */ \"./src/modules/helpers.js\");\n\nvar tableFunc = function tableFunc() {\n  var SERVER_URL = 'http://localhost:4545/works';\n  var contentContainer = document.getElementById('tbody');\n  var selectType = document.getElementById('typeItem');\n  var addItemButton = document.querySelector('.btn-addItem');\n  var modal = document.getElementById('modal');\n  var closeButton = modal.querySelector('.button__close');\n  var modalInputs = modal.querySelectorAll('input');\n  var saveButton = modal.querySelector('.button-ui_firm');\n  var modalHeading = modal.querySelector('.modal__header');\n  var editItemButtons;\n  var currentItemId;\n  var isEdit = false;\n  var modalTitlesArray = ['Добавить новую услугу', 'Редактировать услугу'];\n  var modalButtonTextArray = ['Добавить новую услугу', 'Редактировать услугу'];\n  var newWorkObject = {\n    type: '',\n    name: '',\n    units: '',\n    cost: 0,\n    id: 0\n  };\n  var renderTable = function renderTable(obj) {\n    contentContainer.insertAdjacentHTML('beforeend', \"\\n      <tr class=\\\"table__row\\\">\\n        <td class=\\\"table__id table__cell\\\">\".concat(obj.id, \"</td>\\n        <td class=\\\"table-type table__cell\\\">\").concat(obj.type, \"</td>\\n        <td class=\\\"table-name table__cell\\\">\").concat(obj.name, \"</td>\\n        <td class=\\\"table-units table__cell\\\">\").concat(obj.units, \"</td>\\n        <td class=\\\"table-cost table__cell\\\">\").concat(obj.cost, \"</td>\\n        <td>\\n          <div class=\\\"table__actions table__cell\\\">\\n            <button class=\\\"button action-change\\\">\\n              <span class=\\\"svg_ui\\\">\\n                <svg class=\\\"action-icon_change\\\">\\n                  <use xlink:href=\\\"./images/sprite.svg#change\\\"></use>\\n                </svg>\\n              </span>\\n              <span>\\u0418\\u0437\\u043C\\u0435\\u043D\\u0438\\u0442\\u044C</span>\\n            </button>\\n            <button class=\\\"button action-remove\\\">\\n              <span class=\\\"svg_ui\\\">\\n                <svg class=\\\"action-icon_remove\\\">\\n                  <use xlink:href=\\\"./images/sprite.svg#remove\\\"></use>\\n                </svg>\\n              </span>\\n              <span>\\u0423\\u0434\\u0430\\u043B\\u0438\\u0442\\u044C</span>\\n            </button>\\n          </div>\\n        </td>\\n      </tr>\\n    \"));\n  };\n  var renderContent = function renderContent(data) {\n    var currentType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Все услуги';\n    contentContainer.innerHTML = '';\n    if (currentType === 'Все услуги') {\n      data.forEach(function (obj) {\n        return renderTable(obj);\n      });\n    } else {\n      data.forEach(function (obj) {\n        if (obj.type === currentType) renderTable(obj);\n      });\n    }\n    editItemButtons = document.querySelectorAll('.action-change');\n  };\n  var renderOptions = function renderOptions(data) {\n    var types = new Set();\n    data.forEach(function (obj) {\n      return types.add(obj.type);\n    });\n    types.forEach(function (type) {\n      selectType.insertAdjacentHTML('beforeend', \"\\n        <option value=\\\"\".concat(type, \"\\\">\").concat(type, \"</option>\\n      \"));\n    });\n  };\n  var openModal = function openModal() {\n    setTimeout(function () {\n      return modal.classList.add('modal-opened');\n    }, 50);\n    (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.modalAppearAnimation)(modal);\n  };\n  var closeModal = function closeModal() {\n    (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.modalDisappearAnimation)(modal);\n    setTimeout(function () {\n      return modal.classList.remove('modal-opened');\n    }, 200);\n  };\n  var saveNewWork = function saveNewWork() {\n    newWorkObject.id = (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.generateId)();\n    newWorkObject.type = modalInputs[0].value;\n    newWorkObject.name = modalInputs[1].value;\n    newWorkObject.units = modalInputs[2].value;\n    newWorkObject.cost = +modalInputs[3].value;\n    (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.saveData)(SERVER_URL, 'POST', newWorkObject);\n  };\n  var editWork = function editWork(id) {\n    console.log(id);\n  };\n  var clearForm = function clearForm() {\n    modalInputs[0].value = '';\n    modalInputs[1].value = '';\n    modalInputs[2].value = '';\n    modalInputs[3].value = '';\n  };\n  addItemButton.addEventListener('click', function () {\n    modalHeading.textContent = modalTitlesArray[0];\n    saveButton.textContent = modalButtonTextArray[0];\n    setTimeout(openModal, 10);\n  });\n  closeButton.addEventListener('click', function () {\n    closeModal();\n    setTimeout(clearForm, 210);\n  });\n  saveButton.addEventListener('click', function (evt) {\n    evt.preventDefault();\n    isEdit ? editWork(currentItemId) : saveNewWork();\n    clearForm();\n    setTimeout(function () {\n      return (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.getData)(SERVER_URL).then(function (data) {\n        return renderContent(data, selectType.value);\n      });\n    }, 0);\n  });\n  setTimeout(function () {\n    return editItemButtons.forEach(function (button) {\n      button.addEventListener('click', function (evt) {\n        isEdit = true;\n        var tgt = evt.target;\n        modalHeading.textContent = modalTitlesArray[1];\n        saveButton.textContent = modalButtonTextArray[1];\n        currentItemId = tgt.closest('.table__row').querySelector('.table__id').textContent;\n        fillFormFromDB(currentItemId);\n        openModal();\n      });\n    });\n  }, 200);\n  var fillFormFromDB = function fillFormFromDB(id) {\n    (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.getData)(\"\".concat(SERVER_URL, \"/\").concat(id)).then(function (data) {\n      modalInputs[0].value = data.type;\n      modalInputs[1].value = data.name;\n      modalInputs[2].value = data.units;\n      modalInputs[3].value = data.cost;\n    });\n  };\n  (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.getData)(SERVER_URL).then(function (data) {\n    return renderContent(data);\n  });\n  (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.getData)(SERVER_URL).then(function (data) {\n    return renderOptions(data);\n  }).then(selectType.addEventListener('change', function (evt) {\n    var type = evt.target.value;\n    (0,_helpers__WEBPACK_IMPORTED_MODULE_0__.getData)(SERVER_URL).then(function (data) {\n      return renderContent(data, type);\n    });\n  }));\n};\n\n//# sourceURL=webpack://relax-live/./src/modules/admin/table.js?");

/***/ }),

/***/ "./src/modules/helpers.js":
/*!********************************!*\
  !*** ./src/modules/helpers.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   generateId: () => (/* binding */ generateId),\n/* harmony export */   getCookie: () => (/* binding */ getCookie),\n/* harmony export */   getData: () => (/* binding */ getData),\n/* harmony export */   measureWindowWidth: () => (/* binding */ measureWindowWidth),\n/* harmony export */   modalAppearAnimation: () => (/* binding */ modalAppearAnimation),\n/* harmony export */   modalDisappearAnimation: () => (/* binding */ modalDisappearAnimation),\n/* harmony export */   phoneSymbolsOnly: () => (/* binding */ phoneSymbolsOnly),\n/* harmony export */   saveData: () => (/* binding */ saveData),\n/* harmony export */   toggleActiveClass: () => (/* binding */ toggleActiveClass)\n/* harmony export */ });\nfunction _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }\nfunction _nonIterableRest() { throw new TypeError(\"Invalid attempt to destructure non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _unsupportedIterableToArray(r, a) { if (r) { if (\"string\" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return \"Object\" === t && r.constructor && (t = r.constructor.name), \"Map\" === t || \"Set\" === t ? Array.from(r) : \"Arguments\" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }\nfunction _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }\nfunction _iterableToArrayLimit(r, l) { var t = null == r ? null : \"undefined\" != typeof Symbol && r[Symbol.iterator] || r[\"@@iterator\"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t[\"return\"] && (u = t[\"return\"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }\nfunction _arrayWithHoles(r) { if (Array.isArray(r)) return r; }\nvar toggleActiveClass = function toggleActiveClass(element, className) {\n  return element.classList.toggle(className);\n};\nvar measureWindowWidth = function measureWindowWidth() {\n  return document.documentElement.clientWidth;\n};\nvar modalAppearAnimation = function modalAppearAnimation(modal) {\n  var counter = 0;\n  var _step = function step() {\n    if (counter < 10) {\n      modal.style.visibility = 'visible';\n      modal.style.opacity = \"0.\".concat(counter++);\n      requestAnimationFrame(_step);\n    } else {\n      modal.style.opacity = 1;\n    }\n  };\n  requestAnimationFrame(_step);\n};\nvar modalDisappearAnimation = function modalDisappearAnimation(modal) {\n  var counter = 9;\n  var _step2 = function step() {\n    if (counter > 0) {\n      modal.style.opacity = \"0.\".concat(counter--);\n      requestAnimationFrame(_step2);\n    } else {\n      modal.style.opacity = 0;\n      modal.style.visibility = 'hidden';\n    }\n  };\n  requestAnimationFrame(_step2);\n};\nvar phoneSymbolsOnly = function phoneSymbolsOnly(input) {\n  return input.value = input.value.replace(/[^\\d]+/g, '').replace(/^(\\d{1})(\\d{3})(\\d{3})(\\d{2})(\\d{2})$/, '+$1 ($2) $3-$4-$5');\n};\nvar getData = function getData(url) {\n  return fetch(url).then(function (res) {\n    if (res.status === 200) {\n      return res.json();\n    } else {\n      throw new Error(\"Произошла ошибка, данные не были найдены!\");\n    }\n  })[\"catch\"](function (error) {\n    return console.warn(error);\n  });\n};\nvar saveData = function saveData(url, method, obj) {\n  return fetch(url, {\n    method: method,\n    body: JSON.stringify(obj),\n    headers: {\n      'Content-Type': 'application/json'\n    }\n  }).then(function (res) {\n    if (res.status === 201) {\n      return res.json();\n    } else {\n      throw new Error(\"Произошла ошибка, данные не были сохранены!\");\n    }\n  })[\"catch\"](function (error) {\n    console.warn(error);\n  });\n};\nvar getCookie = function getCookie() {\n  return document.cookie.split('; ').reduce(function (acc, item) {\n    var _item$split = item.split('='),\n      _item$split2 = _slicedToArray(_item$split, 2),\n      name = _item$split2[0],\n      value = _item$split2[1];\n    acc[name] = value;\n    return acc;\n  }, {});\n};\nvar generateId = function generateId() {\n  var numbersString = (Math.floor(Math.random() * (9 - 0 + 1)) + 0).toString();\n  for (var index = 0; index < 9; index++) {\n    numbersString += (Math.floor(Math.random() * (9 - 0 + 1)) + 0).toString();\n  }\n  return numbersString;\n};\n\n\n//# sourceURL=webpack://relax-live/./src/modules/helpers.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/admin-index.js");
/******/ 	
/******/ })()
;