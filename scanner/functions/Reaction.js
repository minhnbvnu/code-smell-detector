function Reaction(name, action) {
    var priority = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var throttleWait = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 10;

    __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_classCallCheck___default()(this, Reaction);

    this.name = name;
    this.action = action;
    this.priority = priority;
    this.observing = [];
    this.dependenciesState = __WEBPACK_IMPORTED_MODULE_2__derivation__["a" /* DerivationState */].NOT_TRACKING;
    this.id = Object(__WEBPACK_IMPORTED_MODULE_6__utils__["s" /* nextId */])();
    this.scheduled = false;
    this.scheduleRun = void 0;
    this.sleeping = false;
    this.running = false;
    this.firstRun = true;

    if (throttleWait > 0) {
      this.scheduleRun = Object(__WEBPACK_IMPORTED_MODULE_6__utils__["x" /* throttle */])(this.run.bind(this), throttleWait);
    } else {
      this.scheduleRun = this.run.bind(this);
    }
  }