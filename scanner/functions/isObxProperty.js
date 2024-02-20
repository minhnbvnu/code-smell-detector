function isObxProperty(descriptor) {
  if (!descriptor || !descriptor.get) {
    return false;
  }

  return descriptor.get[__WEBPACK_IMPORTED_MODULE_6__obx__["b" /* SYMBOL_OBX */]] ? true : false;
}