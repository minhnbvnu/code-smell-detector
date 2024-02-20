function Prop(area, config, view) {
    __WEBPACK_IMPORTED_MODULE_0__babel_runtime_helpers_classCallCheck___default()(this, Prop);

    this.area = area;
    this.key = void 0;
    this.spread = false;
    this.data = void 0;
    this.reactiveData = null;
    this.key = config.key;

    if (config.expr) {
      this.reactiveData = new __WEBPACK_IMPORTED_MODULE_2__obx_observable_obx_property__["a" /* default */](config.key, area.scope, config.expr, undefined, config.value, [area, view], __WEBPACK_IMPORTED_MODULE_4__obx_observable_obx__["a" /* ObxFlag */].REF);
    } else {
      this.data = config.value;
    }

    this.spread = Boolean(config.spread);
  }