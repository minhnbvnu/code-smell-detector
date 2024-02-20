function createDynamicLoader(loader) {
  var page = function page(props) {
    return Object(__WEBPACK_IMPORTED_MODULE_2_react__["createElement"])(__WEBPACK_IMPORTED_MODULE_5__loader__["a" /* default */], __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_objectSpread___default()({
      loader: loader
    }, props));
  };

  page.displayName = 'DynamicPage';
  return page;
}