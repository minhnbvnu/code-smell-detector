function asObservable(thing, obxFlag) {
  if (!Object(__WEBPACK_IMPORTED_MODULE_0__utils__["n" /* isObject */])(thing)) {
    return;
  }

  if (Object(__WEBPACK_IMPORTED_MODULE_3__obx__["f" /* hasObx */])(thing)) {
    return Object(__WEBPACK_IMPORTED_MODULE_3__obx__["e" /* getObx */])(thing);
  }

  if (!Object.isExtensible(thing)) {
    return;
  }

  var name = (thing.constructor.name || 'ObservableObject') + '@' + Object(__WEBPACK_IMPORTED_MODULE_0__utils__["s" /* nextId */])();
  var ObxContructor = asObservable.getObxContructor(thing);
  var obx = ObxContructor ? new ObxContructor(name, thing, obxFlag) : null;

  if (obx) {
    Object(__WEBPACK_IMPORTED_MODULE_3__obx__["g" /* injectObx */])(thing, obx);
    return obx;
  }
}