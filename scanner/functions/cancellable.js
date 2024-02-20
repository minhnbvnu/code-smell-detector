function cancellable(fn) {
    var cb = function cb() {
      if (!cb.cancelled) {
        return fn.apply(this, arguments);
      }
    };
    cb.cancel = function () {
      cb.cancelled = true;
    };
    return cb;
  }