function $extend(target, properties) {
  var obx = Object(__WEBPACK_IMPORTED_MODULE_2__observable_obx__["e" /* getObx */])(target);

  if (obx) {
    obx.extend(properties);
  }
}