function expose(promise) {
      // Don't add hooks to the same promise twice (shouldn't happen anyway)
      if (!promise.hasOwnProperty('$$resolved')) {
        promise.$$resolved = false;
        promise.then(function (value) {
          promise.$$resolved = { success: true, value: value };
        }, function (error) {
          promise.$$resolved = { success: false, error: error };
        });

        // We need to expose() any then()ed promises recursively
        var qThen = promise.then;
        promise.then = function () {
          return expose(qThen.apply(this, arguments));
        };
      }
      return promise;
    }