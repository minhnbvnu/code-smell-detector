function patchMutator(keys, proto, methods) {
  keys.forEach(function (method) {
    var original = proto[method];
    Object(__WEBPACK_IMPORTED_MODULE_5__utils__["g" /* addHiddenProp */])(methods, method, function mutator() {
      var size = this.size;

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      var result = original.apply(this, args);
      var obx = Object(__WEBPACK_IMPORTED_MODULE_6__obx__["e" /* getObx */])(this);
      var changed = true;

      switch (method) {
        case 'add':
        case 'clear':
        case 'delete':
          changed = this.size !== size;
          break;
      } // now: "set" not compare values, default changed


      if (obx && changed) {
        obx.reportChange();
      }

      return result;
    });
  });
}