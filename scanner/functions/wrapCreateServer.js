function wrapCreateServer(shim, fn, fnName, server) {
    // If we have not wrapped the server class, now's the time to do that.
    if (server && !wrappedServerClass) {
      wrappedServerClass = true
      wrapServer(Object.getPrototypeOf(server))
    }
  }