function getObxProperty(obj, key) {
  var descriptor = Object.getOwnPropertyDescriptor(obj, key);

  if (!descriptor || !descriptor.get) {
    return null;
  }

  return descriptor.get[__WEBPACK_IMPORTED_MODULE_6__obx__["b" /* SYMBOL_OBX */]];
}