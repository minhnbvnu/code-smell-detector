function RequestGroup(baseConfig, options) {
    if (baseConfig === void 0) {
      baseConfig = {};
    }

    if (options === void 0) {
      options = {};
    }

    this.baseConfig = baseConfig;
    this.options = options;
    this.storage = new __WEBPACK_IMPORTED_MODULE_4__snapshot_storage__["a" /* default */]();
  }