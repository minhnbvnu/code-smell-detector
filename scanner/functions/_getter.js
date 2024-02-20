function _getter(p) {
    return function () {
      return this[p];
    };
  }