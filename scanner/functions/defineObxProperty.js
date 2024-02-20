function defineObxProperty(obj, key, val, descriptor) {
  var obxFlag = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : __WEBPACK_IMPORTED_MODULE_6__obx__["a" /* ObxFlag */].DEEP;

  if (!descriptor) {
    descriptor = Object.getOwnPropertyDescriptor(obj, key);
  }

  if (descriptor && descriptor.configurable === false) {
    return;
  }

  if (val == null && descriptor && Object(__WEBPACK_IMPORTED_MODULE_5__utils__["k" /* hasOwnProperty */])(descriptor, 'value')) {
    val = descriptor.value;
  }

  var getter = descriptor && descriptor.get;
  var setter = descriptor && descriptor.set;
  var property = new ObxProperty(String(key), obj, getter, setter, val, undefined, obxFlag);

  var get = function get() {
    return property.get();
  };

  get[__WEBPACK_IMPORTED_MODULE_6__obx__["b" /* SYMBOL_OBX */]] = property;
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: get,
    set: function set(newVal) {
      return property.set(newVal);
    }
  });
}