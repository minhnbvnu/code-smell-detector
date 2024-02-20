function ObxArray(name, target) {
    var _this;

    var obxFlag = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : __WEBPACK_IMPORTED_MODULE_9__obx__["a" /* ObxFlag */].DEEP;

    __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_classCallCheck___default()(this, ObxArray);

    _this = __WEBPACK_IMPORTED_MODULE_2__babel_runtime_helpers_possibleConstructorReturn___default()(this, __WEBPACK_IMPORTED_MODULE_3__babel_runtime_helpers_getPrototypeOf___default()(ObxArray).call(this, name, target, obxFlag));

    if (__WEBPACK_IMPORTED_MODULE_8__proxy__["f" /* supportProxy */]) {
      _this.target = Object(__WEBPACK_IMPORTED_MODULE_8__proxy__["c" /* createProxy */])(target, arrayProxyTraps);
    } else if (obxFlag > __WEBPACK_IMPORTED_MODULE_9__obx__["a" /* ObxFlag */].VAL) {
      Object(__WEBPACK_IMPORTED_MODULE_7__observable__["d" /* observeIterable */])(target, childFlag(obxFlag));
    }

    Object(__WEBPACK_IMPORTED_MODULE_6__utils__["v" /* setPrototypeOf */])(target, arrayMethods);
    return _this;
  }