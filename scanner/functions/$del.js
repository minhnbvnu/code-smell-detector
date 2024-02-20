function $del(target, key) {
  var obx = Object(__WEBPACK_IMPORTED_MODULE_2__observable_obx__["e" /* getObx */])(target);

  if (obx) {
    obx.del(key);
  }
}