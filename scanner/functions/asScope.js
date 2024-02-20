function asScope(data) {
  var parentScope = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  // FIXME remove this line
  Object(__WEBPACK_IMPORTED_MODULE_4__obx_observable_observable__["b" /* asObservable */])(data, __WEBPACK_IMPORTED_MODULE_3__obx_observable_obx__["a" /* ObxFlag */].SHALLOW);
  Object(__WEBPACK_IMPORTED_MODULE_2__obx_utils__["f" /* addHiddenFinalProp */])(data, '$super', parentScope);
  Object(__WEBPACK_IMPORTED_MODULE_2__obx_utils__["v" /* setPrototypeOf */])(data, parentScope || new BaseScope());
  return data;
}