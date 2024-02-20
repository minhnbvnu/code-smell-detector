function callOnce(self, resolveFn, rejectFn) {
    var called = false;
    function wrap(fn) {
      return function(value) {
        if (called) return;
        called = true;
        fn.call(self, value);
      };
    }

    return [wrap(resolveFn), wrap(rejectFn)];
  }