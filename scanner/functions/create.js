function create(type, props, children) {
  if (!children || children.length < 1) {
    return Object(__WEBPACK_IMPORTED_MODULE_3_react__["createElement"])(type, props);
  }

  return __WEBPACK_IMPORTED_MODULE_3_react__["createElement"].apply(void 0, [type, props].concat(__WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_toConsumableArray___default()(children)));
}