function _resolve (promise, value) {
    if (promise === value) {
      _reject(promise, selfFulfillment())
    } else if (objectOrFunction(value)) {
      handleMaybeThenable(promise, value, getThen(value))
    } else {
      fulfill(promise, value)
    }
  }