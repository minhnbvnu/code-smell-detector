function useSetTimeout () {
    // Store setTimeout reference so es6-promise will be unaffected by
    // other code modifying setTimeout (like sinon.useFakeTimers())
    var globalSetTimeout = setTimeout
    return function () {
      return globalSetTimeout(flush, 1)
    }
  }