function asyncPromise() {
      // only serve one instance of a promise in order to save CPU cycles
      if (!currentDefer) {
        currentDefer = $$q.defer();
        $$asyncCallback(function() {
          currentDefer.resolve();
          currentDefer = null;
        });
      }
      return currentDefer.promise;
    }