function patchAccessor(keys, proto, methods) {
  keys.forEach(function (method) {
    var original = proto[method];
    Object(__WEBPACK_IMPORTED_MODULE_5__utils__["g" /* addHiddenProp */])(methods, method, function accessor() {
      var obx = Object(__WEBPACK_IMPORTED_MODULE_6__obx__["e" /* getObx */])(this);
      var flag = obx ? obx.obxFlag : __WEBPACK_IMPORTED_MODULE_6__obx__["a" /* ObxFlag */].REF;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      if (method === 'forEach') {
        var fn = args[0];
        var thisArg = args[0] || this;

        args[0] = function (v, a, c) {
          Object(__WEBPACK_IMPORTED_MODULE_7__observable__["i" /* reportChildValue */])(v, flag);
          return fn.call(thisArg, Object(__WEBPACK_IMPORTED_MODULE_8__proxy__["d" /* getProxiedValue */])(v), a, c);
        };

        return original.apply(this, args);
      }

      var result = original.apply(this, args);

      if (method === 'get') {
        Object(__WEBPACK_IMPORTED_MODULE_7__observable__["i" /* reportChildValue */])(result, flag);
        return Object(__WEBPACK_IMPORTED_MODULE_8__proxy__["d" /* getProxiedValue */])(result);
      }

      if (isIterator(result)) {
        var originNext = result.next;
        var isMapIter = String(result) === '[object Map Iterator]';
        var isEntries = method === 'entries';
        var _keys = null;

        if (isEntries && !isMapIter) {
          _keys = ['0', '1'];
        } else if (isMapIter && (isEntries || method === Symbol.iterator)) {
          _keys = ['1'];
        }

        result.next = function next() {
          var n = originNext.call(this);

          if (!n.done) {
            if (_keys) {
              n.value = createResultProxy(n.value, flag, _keys);
            } else {
              n = createResultProxy(n, flag);
            }
          }

          return n;
        };
      }

      return result;
    });
  });
}