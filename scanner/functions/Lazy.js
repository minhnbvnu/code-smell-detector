function Lazy(mapFn) {
    this._resolve = function (value, options) {
      var schema = mapFn(value, options);
      if (!Object(_util_isSchema__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"])(schema)) throw new TypeError('lazy() functions must return a valid schema');
      return schema.resolve(options);
    };
  }