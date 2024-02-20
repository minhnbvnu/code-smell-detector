function makePromise (promise) {
    promise[PROMISE_ID] = id++
    promise._state = undefined
    promise._result = undefined
    promise._subscribers = []
  }