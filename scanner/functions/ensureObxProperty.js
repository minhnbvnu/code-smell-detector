function ensureObxProperty(obj, prop) {
  var obxFlag = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : __WEBPACK_IMPORTED_MODULE_6__obx__["a" /* ObxFlag */].DEEP;
  var descriptor = Object.getOwnPropertyDescriptor(obj, prop);

  if (!descriptor || isObxProperty(descriptor)) {
    return;
  }

  defineObxProperty(obj, prop, undefined, descriptor, obxFlag);
}