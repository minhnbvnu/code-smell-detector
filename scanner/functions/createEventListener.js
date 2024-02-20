function createEventListener (eventName, f) {
  return function (event, data) {
    if (event === eventName) { f(data) }
  }
}