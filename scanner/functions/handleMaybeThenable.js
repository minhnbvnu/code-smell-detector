function handleMaybeThenable (promise, maybeThenable, then$$) {
    if (maybeThenable.constructor === promise.constructor && then$$ === then && maybeThenable.constructor.resolve === resolve) {
      handleOwnThenable(promise, maybeThenable)
    } else {
      if (then$$ === GET_THEN_ERROR) {
        _reject(promise, GET_THEN_ERROR.error)
      } else if (then$$ === undefined) {
        fulfill(promise, maybeThenable)
      } else if (isFunction(then$$)) {
        handleForeignThenable(promise, maybeThenable, then$$)
      } else {
        fulfill(promise, maybeThenable)
      }
    }
  }