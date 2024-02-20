function initializePromise (promise, resolver) {
    try {
      resolver(function resolvePromise (value) {
        _resolve(promise, value)
      }, function rejectPromise (reason) {
        _reject(promise, reason)
      })
    } catch (e) {
      _reject(promise, e)
    }
  }