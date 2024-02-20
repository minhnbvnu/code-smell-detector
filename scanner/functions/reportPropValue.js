function reportPropValue(propValue, propFlag) {
  if (propValue == null) return;
  var x = propFlag > __WEBPACK_IMPORTED_MODULE_3__obx__["a" /* ObxFlag */].REF ? asObservable(propValue, propFlag) : Object(__WEBPACK_IMPORTED_MODULE_3__obx__["e" /* getObx */])(propValue);

  if (x) {
    reportObserved(x);
  }
}