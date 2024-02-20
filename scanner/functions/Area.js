function Area(scope, config) {
    var _this = this;

    __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_classCallCheck___default()(this, Area);

    this.scope = scope;
    this.config = config;
    this.key = void 0;
    this.priority = void 0;
    this.sleepMarked = false;
    this.sleeping = false;
    this.revision = -1;
    this.areasMap = {};
    this.areas = [];
    this.viewsData = {};
    this.exprsData = {};
    this.views = {};
    this.exprs = {};
    this.reaction = void 0;
    this.notify = false;
    this.running = false;
    this.priority = config.priority || 0;
    this.key = config.key || Object(__WEBPACK_IMPORTED_MODULE_3__obx_utils__["s" /* nextId */])();
    var views = (config.views || []).map(function (viewConfig) {
      var view = new __WEBPACK_IMPORTED_MODULE_5__observable_view__["a" /* default */](_this, viewConfig);
      _this.views[view.key] = view;
      return view;
    });
    var exprs = (config.exprs || []).map(function (exprConfig) {
      var expr = new __WEBPACK_IMPORTED_MODULE_2__prop__["a" /* default */](_this, exprConfig);
      _this.exprs[expr.key] = expr;
      return expr;
    });
    this.reaction = new __WEBPACK_IMPORTED_MODULE_6__obx_reaction__["a" /* Reaction */]("Area@".concat(this.key), function () {
      _this.revision += 1;
      _this.running = true;
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

      if (Object(__WEBPACK_IMPORTED_MODULE_11__obx_observable_obx__["f" /* hasObx */])(_this.scope)) {
        var obx = Object(__WEBPACK_IMPORTED_MODULE_11__obx_observable_obx__["e" /* getObx */])(_this.scope);
        Object(__WEBPACK_IMPORTED_MODULE_10__obx_observable_observable__["j" /* reportObserved */])(obx);
      }

      _this.running = false;

      if (_this.notify) {
        Object(__WEBPACK_IMPORTED_MODULE_4__obx_listener__["a" /* notifyListeners */])(_this);
      } else {
        _this.notify = true;
      }
    }, this.priority, config.throttle || 10);
  }