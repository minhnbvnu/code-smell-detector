function publishRejection (promise) {
    if (promise._onerror) {
      promise._onerror(promise._result)
    }

    publish(promise)
  }