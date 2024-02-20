function _async(e) {
    return function () {
      for (var t = [], r = 0; r < arguments.length; r++) t[r] = arguments[r];
      try {
        return Promise.resolve(e.apply(this, t));
      } catch (e) {
        return Promise.reject(e);
      }
    };
  }