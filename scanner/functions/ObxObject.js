function ObxObject(name, target) {
    var _this;

    var obxFlag = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : __WEBPACK_IMPORTED_MODULE_8__obx__["a" /* ObxFlag */].DEEP;

    __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_classCallCheck___default()(this, ObxObject);

    _this = __WEBPACK_IMPORTED_MODULE_2__babel_runtime_helpers_possibleConstructorReturn___default()(this, __WEBPACK_IMPORTED_MODULE_3__babel_runtime_helpers_getPrototypeOf___default()(ObxObject).call(this, name, target, obxFlag));

    if (__WEBPACK_IMPORTED_MODULE_7__proxy__["f" /* supportProxy */]) {
      _this.target = Object(__WEBPACK_IMPORTED_MODULE_7__proxy__["c" /* createProxy */])(target, objectProxyTraps);
    } else if (obxFlag > __WEBPACK_IMPORTED_MODULE_8__obx__["a" /* ObxFlag */].REF) {
      Object(__WEBPACK_IMPORTED_MODULE_6__utils__["y" /* walk */])(target, function (obj, key, val) {
        Object(__WEBPACK_IMPORTED_MODULE_9__obx_property__["b" /* defineObxProperty */])(obj, key, val, undefined, propFlag(obxFlag));
      });
    }

    return _this;
  }