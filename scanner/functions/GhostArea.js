function GhostArea(scope, config, notifier) {
    __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_classCallCheck___default()(this, GhostArea);

    this.scope = scope;
    this.config = config;
    this.notifier = notifier;
    this.key = void 0;
    this.sleeping = false;
    this.areas = [];
    this.areasMap = {};
    this.marked = false;
    this.key = config.key;
  }