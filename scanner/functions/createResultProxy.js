function createResultProxy(entries, flag) {
  var keys = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ['value'];
  return new Proxy(entries, {
    get: function get(target, key) {
      var v = target[key];

      if (v && keys.includes(key)) {
        Object(__WEBPACK_IMPORTED_MODULE_7__observable__["i" /* reportChildValue */])(v, flag);
      }

      return Object(__WEBPACK_IMPORTED_MODULE_8__proxy__["d" /* getProxiedValue */])(v);
    }
  });
}