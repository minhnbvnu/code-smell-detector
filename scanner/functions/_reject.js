function _reject (promise, reason) {
    if (promise._state !== PENDING) {
      return
    }
    promise._state = REJECTED
    promise._result = reason

    asap(publishRejection, promise)
  }