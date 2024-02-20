function handleThenable(promise, value) {
    var resolved;

    try {
      if (promise === value) {
        throw new TypeError('A promises callback cannot return that same promise.');
      }

      if (value && (typeof value === 'function' || _typeof(value) === 'object')) {
        // then should be retrieved only once
        var then = value.then;

        if (typeof then === 'function') {
          then.call(value, function (val) {
            if (!resolved) {
              resolved = true;

              if (value === val) {
                fulfill(promise, val);
              } else {
                resolve(promise, val);
              }
            }
          }, function (reason) {
            if (!resolved) {
              resolved = true;
              reject(promise, reason);
            }
          });
          return true;
        }
      }
    } catch (e) {
      if (!resolved) {
        reject(promise, e);
      }

      return true;
    }

    return false;
  }