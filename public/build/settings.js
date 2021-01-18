/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is not neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./web/settings.js":
/*!*************************!*\
  !*** ./web/settings.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _util_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./util.js */ \"./web/util.js\");\n\n\nconst deleteAccountBtn = document.querySelector('.delete-account-btn')\nconst deleteAccountModal = document.querySelector('.delete-account-modal')\nconst cancelBtn = document.querySelector('.cancel-delete-btn')\nconst confirmBtn = document.querySelector('.confirm-delete-btn')\n\ndeleteAccountBtn.addEventListener('click', () => {\n    deleteAccountModal.style.display = 'block'\n})\n\ncancelBtn.addEventListener('click', () => {\n    deleteAccountModal.style.display = 'none'\n})\n\nconfirmBtn.addEventListener('click', async () => {\n    try {\n        await (0,_util_js__WEBPACK_IMPORTED_MODULE_0__.ajax)('/deleteaccount')\n    } catch(err) {\n        console.log(err)\n    }\n})\n\n\n\n//# sourceURL=webpack://quickjoin/./web/settings.js?");

/***/ }),

/***/ "./web/util.js":
/*!*********************!*\
  !*** ./web/util.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"ajax\": () => /* binding */ ajax,\n/* harmony export */   \"clearValues\": () => /* binding */ clearValues,\n/* harmony export */   \"checkLinkValid\": () => /* binding */ checkLinkValid,\n/* harmony export */   \"checkDuplicateName\": () => /* binding */ checkDuplicateName\n/* harmony export */ });\nasync function ajax(path, data = undefined) {\n    const options = {\n        method: data ? 'POST' : 'GET',\n    }\n\n    if (data) {\n        options.body = JSON.stringify(data) \n        options.headers = {\n            'Content-Type': 'application/json'\n        }\n    }\n\n    return await fetch(path, options)\n        .then(res => res.json())\n}\n\nfunction clearValues(obj) {\n    Object.keys(obj)\n        .forEach(key => obj[key] = '')\n}\n\nfunction checkLinkValid({ url, name }) {\n    return url.length > 0 && name.length > 0\n}\n\nfunction checkDuplicateName(arr, name) {\n    return arr.map(meeting => meeting.name)\n        .includes(name)\n}\n\n//# sourceURL=webpack://quickjoin/./web/util.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
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
/******/ 		__webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop)
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
/******/ 	// startup
/******/ 	// Load entry module
/******/ 	__webpack_require__("./web/settings.js");
/******/ 	// This entry module used 'exports' so it can't be inlined
/******/ })()
;