function patchConsoleUsingWindowValues() {
  var _castBool, _castBool2, _castBool3, _castBool4, _castBrowserTheme;

  const appendComponentStack = (_castBool = Object(_utils__WEBPACK_IMPORTED_MODULE_4__[/* castBool */ "a"])(window.__REACT_DEVTOOLS_APPEND_COMPONENT_STACK__)) !== null && _castBool !== void 0 ? _castBool : true;
  const breakOnConsoleErrors = (_castBool2 = Object(_utils__WEBPACK_IMPORTED_MODULE_4__[/* castBool */ "a"])(window.__REACT_DEVTOOLS_BREAK_ON_CONSOLE_ERRORS__)) !== null && _castBool2 !== void 0 ? _castBool2 : false;
  const showInlineWarningsAndErrors = (_castBool3 = Object(_utils__WEBPACK_IMPORTED_MODULE_4__[/* castBool */ "a"])(window.__REACT_DEVTOOLS_SHOW_INLINE_WARNINGS_AND_ERRORS__)) !== null && _castBool3 !== void 0 ? _castBool3 : true;
  const hideConsoleLogsInStrictMode = (_castBool4 = Object(_utils__WEBPACK_IMPORTED_MODULE_4__[/* castBool */ "a"])(window.__REACT_DEVTOOLS_HIDE_CONSOLE_LOGS_IN_STRICT_MODE__)) !== null && _castBool4 !== void 0 ? _castBool4 : false;
  const browserTheme = (_castBrowserTheme = Object(_utils__WEBPACK_IMPORTED_MODULE_4__[/* castBrowserTheme */ "b"])(window.__REACT_DEVTOOLS_BROWSER_THEME__)) !== null && _castBrowserTheme !== void 0 ? _castBrowserTheme : 'dark';
  patch({
    appendComponentStack,
    breakOnConsoleErrors,
    showInlineWarningsAndErrors,
    hideConsoleLogsInStrictMode,
    browserTheme
  });
}