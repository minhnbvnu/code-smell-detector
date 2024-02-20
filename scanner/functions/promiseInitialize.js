function promiseInitialize(shim) {
  const callbackAPI = shim.require('./index')
  if (callbackAPI && !shim.isWrapped(callbackAPI.createConnection)) {
    callbackInitialize(shim, callbackAPI)
  }
}