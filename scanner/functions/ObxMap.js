function ObxMap(name, target) {
    var _this;

    var obxFlag = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : __WEBPACK_IMPORTED_MODULE_6__obx__["a" /* ObxFlag */].DEEP;

    __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_classCallCheck___default()(this, ObxMap);

    _this = __WEBPACK_IMPORTED_MODULE_2__babel_runtime_helpers_possibleConstructorReturn___default()(this, __WEBPACK_IMPORTED_MODULE_3__babel_runtime_helpers_getPrototypeOf___default()(ObxMap).call(this, name, target, obxFlag));
    Object(__WEBPACK_IMPORTED_MODULE_5__utils__["v" /* setPrototypeOf */])(target, mapMethods);
    return _this;
  }