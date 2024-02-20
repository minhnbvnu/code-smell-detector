function checkAll(cb) {
    return function () {
      for (var i = watches.length - 1; i >= 0; i--) {
        cb.apply(this, watches[i]);
      }
    };
  }