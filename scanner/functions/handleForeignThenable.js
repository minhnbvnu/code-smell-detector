function handleForeignThenable (promise, thenable, then) {
    asap(function (promise) {
      var sealed = false
      var error = tryThen(then, thenable, function (value) {
        if (sealed) {
          return
        }
        sealed = true
        if (thenable !== value) {
          _resolve(promise, value)
        } else {
          fulfill(promise, value)
        }
      }, function (reason) {
        if (sealed) {
          return
        }
        sealed = true

        _reject(promise, reason)
      }, 'Settle: ' + (promise._label || ' unknown promise'))

      if (!sealed && error) {
        sealed = true
        _reject(promise, error)
      }
    }, promise)
  }