function wrap(fn) {
      return function(value) {
        if (called) return;
        called = true;
        fn.call(self, value);
      };
    }