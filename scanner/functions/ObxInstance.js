function ObxInstance(name, target) {
    var _this;

    var obxFlag = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : __WEBPACK_IMPORTED_MODULE_8__obx__["a" /* ObxFlag */].REF;

    __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_classCallCheck___default()(this, ObxInstance);

    _this = __WEBPACK_IMPORTED_MODULE_2__babel_runtime_helpers_possibleConstructorReturn___default()(this, __WEBPACK_IMPORTED_MODULE_3__babel_runtime_helpers_getPrototypeOf___default()(ObxInstance).call(this, name, target, obxFlag));
    var decorators = Object(__WEBPACK_IMPORTED_MODULE_6__utils__["j" /* getObxDecorators */])(target);

    if (decorators) {
      Object(__WEBPACK_IMPORTED_MODULE_6__utils__["y" /* walk */])(decorators, function (_, key, d) {
        var descriptor = d.descriptor;
        var initialValue = descriptor ? descriptor.initializer ? descriptor.initializer.call(target) : descriptor.value : undefined;
        Object(__WEBPACK_IMPORTED_MODULE_7__obx_property__["b" /* defineObxProperty */])(target, key, initialValue, {
          set: descriptor && descriptor.set,
          get: descriptor && descriptor.get
        }, d.flag);
      });
    }

    return _this;
  }