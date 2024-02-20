function observable(target, prop, descriptor) {
  var flag = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : __WEBPACK_IMPORTED_MODULE_2__observable_obx__["a" /* ObxFlag */].DEEP;

  if (!Object(__WEBPACK_IMPORTED_MODULE_1__utils__["k" /* hasOwnProperty */])(target, __WEBPACK_IMPORTED_MODULE_1__utils__["e" /* SYMBOL_DECORATORS */])) {
    var inheritedDecorators = target[__WEBPACK_IMPORTED_MODULE_1__utils__["e" /* SYMBOL_DECORATORS */]];
    Object(__WEBPACK_IMPORTED_MODULE_1__utils__["g" /* addHiddenProp */])(target, __WEBPACK_IMPORTED_MODULE_1__utils__["e" /* SYMBOL_DECORATORS */], __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_objectSpread___default()({}, inheritedDecorators));
  }

  target[__WEBPACK_IMPORTED_MODULE_1__utils__["e" /* SYMBOL_DECORATORS */]][prop] = {
    prop: prop,
    descriptor: descriptor,
    flag: flag
  };
  return Object(__WEBPACK_IMPORTED_MODULE_1__utils__["h" /* createPropertyInitializerDescriptor */])(prop);
}