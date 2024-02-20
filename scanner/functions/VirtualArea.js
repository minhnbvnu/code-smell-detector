function VirtualArea(scope, config, notifier) {
    var _this = this;

    __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_classCallCheck___default()(this, VirtualArea);

    this.scope = scope;
    this.config = config;
    this.notifier = notifier;
    this.id = Object(__WEBPACK_IMPORTED_MODULE_3__obx_utils__["s" /* nextId */])();
    this.key = void 0;
    this.name = void 0;
    this.observing = [];
    this.dependenciesState = __WEBPACK_IMPORTED_MODULE_5__obx_derivation__["a" /* DerivationState */].NOT_TRACKING;
    this.isVirtual = true;
    this.sleepMarked = false;
    this.sleeping = false;
    this.running = false;
    this.areasMap = {};
    this.areas = [];
    this.viewsData = {};
    this.exprsData = {};
    this.views = {};
    this.exprs = {};
    this.reaction = void 0;
    this.key = config.key || this.id;
    this.name = "varea@".concat(this.key);
    var views = (config.views || []).map(function (viewConfig) {
      var view = new __WEBPACK_IMPORTED_MODULE_4__observable_view__["a" /* default */](_this, viewConfig);
      _this.views[view.key] = view;
      return view;
    });
    var exprs = (config.exprs || []).map(function (exprConfig) {
      var expr = new __WEBPACK_IMPORTED_MODULE_2__prop__["a" /* default */](_this, exprConfig);
      _this.exprs[expr.key] = expr;
      return expr;
    });

    this.reaction = function () {
      _this.viewsData = {};
      _this.exprsData = {};
      views.forEach(function (view) {
        if (!Object(__WEBPACK_IMPORTED_MODULE_3__obx_utils__["k" /* hasOwnProperty */])(_this.viewsData, view.key)) {
          _this.viewsData[view.key] = view.props;
        }
      });
      exprs.forEach(function (expr) {
        if (!Object(__WEBPACK_IMPORTED_MODULE_3__obx_utils__["k" /* hasOwnProperty */])(_this.exprsData, expr.key)) {
          _this.exprsData[expr.key] = expr.getData();
        }
      });
    };
  }