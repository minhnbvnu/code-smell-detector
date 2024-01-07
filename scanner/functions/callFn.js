function callFn(fn) {
    var result = fn.call(ctx);
    if (result && typeof result.then === 'function') {
      self.resetTimeout();
      result.then(
        function() {
          done();
          // Return null so libraries like bluebird do not warn about
          // subsequently constructed Promises.
          return null;
        },
        function(reason) {
          done(reason || new Error('Promise rejected with no or falsy reason'));
        }
      );
    } else {
      if (self.asyncOnly) {
        return done(
          new Error(
            '--async-only option in use without declaring `done()` or returning a promise'
          )
        );
      }

      done();
    }
  }