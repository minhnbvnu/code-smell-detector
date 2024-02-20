function handleOwnThenable (promise, thenable) {
    if (thenable._state === FULFILLED) {
      fulfill(promise, thenable._result)
    } else if (thenable._state === REJECTED) {
      _reject(promise, thenable._result)
    } else {
      subscribe(thenable, undefined, function (value) {
        return _resolve(promise, value)
      }, function (reason) {
        return _reject(promise, reason)
      })
    }
  }