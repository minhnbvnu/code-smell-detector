function Obx(name, target) {
    var obxFlag = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ObxFlag.DEEP;

    __WEBPACK_IMPORTED_MODULE_1__babel_runtime_helpers_classCallCheck___default()(this, Obx);

    this.name = name;
    this.target = target;
    this.obxFlag = obxFlag;
    this.id = Object(__WEBPACK_IMPORTED_MODULE_5__utils__["s" /* nextId */])();
    this.localVer = 0;
    this.observing = [];
    this.observers = new Set();
    this.dependenciesState = __WEBPACK_IMPORTED_MODULE_8__derivation__["a" /* DerivationState */].NOT_TRACKING;
    this.lowestObserverState = __WEBPACK_IMPORTED_MODULE_8__derivation__["a" /* DerivationState */].UP_TO_DATE;
  }