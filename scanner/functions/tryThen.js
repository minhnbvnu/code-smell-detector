function tryThen (then, value, fulfillmentHandler, rejectionHandler) {
    try {
      then.call(value, fulfillmentHandler, rejectionHandler)
    } catch (e) {
      return e
    }
  }