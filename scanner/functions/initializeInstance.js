function initializeInstance(target) {
  if (target[SYMBOL_INITIALIZED] === true) {
    return;
  }

  addHiddenProp(target, SYMBOL_INITIALIZED, true);

  if (!Object(__WEBPACK_IMPORTED_MODULE_2__observable_obx__["f" /* hasObx */])(target)) {
    var _name = (target.constructor.name || 'ObservableObject') + '@' + nextId();

    var obx = new __WEBPACK_IMPORTED_MODULE_3__observable_obx_instance__["a" /* default */](_name, target);
    Object(__WEBPACK_IMPORTED_MODULE_2__observable_obx__["g" /* injectObx */])(target, obx);
  }
}