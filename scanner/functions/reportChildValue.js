function reportChildValue(propValue, ownerFlag) {
  if (propValue == null) return;
  var x = ownerFlag > __WEBPACK_IMPORTED_MODULE_3__obx__["a" /* ObxFlag */].VAL ? asObservable(propValue, ownerFlag === __WEBPACK_IMPORTED_MODULE_3__obx__["a" /* ObxFlag */].DEEP ? __WEBPACK_IMPORTED_MODULE_3__obx__["a" /* ObxFlag */].DEEP : __WEBPACK_IMPORTED_MODULE_3__obx__["a" /* ObxFlag */].VAL) : Object(__WEBPACK_IMPORTED_MODULE_3__obx__["e" /* getObx */])(propValue);

  if (x) {
    reportObserved(x);
  }
}