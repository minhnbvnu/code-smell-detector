function ObxProperty(name, scope, getter, setter, value, extraGetterParams) {
    var obxFlag = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : __WEBPACK_IMPORTED_MODULE_6__obx__["a" /* ObxFlag */].DEEP;

    __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_classCallCheck___default()(this, ObxProperty);

    this.name = name;
    this.scope = scope;
    this.getter = getter;
    this.setter = setter;
    this.value = value;
    this.extraGetterParams = extraGetterParams;
    this.obxFlag = obxFlag;
    this.id = Object(__WEBPACK_IMPORTED_MODULE_5__utils__["s" /* nextId */])();
    this.observing = [];
    this.observers = new Set();
    this.dependenciesState = __WEBPACK_IMPORTED_MODULE_3__derivation__["a" /* DerivationState */].NOT_TRACKING;
    this.lowestObserverState = __WEBPACK_IMPORTED_MODULE_3__derivation__["a" /* DerivationState */].UP_TO_DATE;
    this.isComputing = false;
    this.isRunningSetter = false;
    this.pending = false;
    this.pendingValue = null;
    this.objectVer = 0;
  }