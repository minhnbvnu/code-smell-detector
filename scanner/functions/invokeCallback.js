function invokeCallback (settled, promise, callback, detail) {
    var hasCallback = isFunction(callback),
      value = undefined,
      error = undefined,
      succeeded = undefined,
      failed = undefined

    if (hasCallback) {
      value = tryCatch(callback, detail)

      if (value === TRY_CATCH_ERROR) {
        failed = true
        error = value.error
        value = null
      } else {
        succeeded = true
      }

      if (promise === value) {
        _reject(promise, cannotReturnOwn())
        return
      }
    } else {
      value = detail
      succeeded = true
    }

    if (promise._state !== PENDING) {
      // noop
    } else if (hasCallback && succeeded) {
      _resolve(promise, value)
    } else if (failed) {
      _reject(promise, error)
    } else if (settled === FULFILLED) {
      fulfill(promise, value)
    } else if (settled === REJECTED) {
      _reject(promise, value)
    }
  }