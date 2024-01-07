function bind(fn, thisArg) {
    return function () {
      fn.apply(thisArg, arguments);
    };
  }