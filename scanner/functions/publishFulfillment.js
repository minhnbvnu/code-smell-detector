function publishFulfillment(promise) {
    promise._state = FULFILLED;
    publish(promise);
  }