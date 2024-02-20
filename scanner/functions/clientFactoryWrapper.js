function clientFactoryWrapper(shim, fn, fnName, client) {
    clientPostConstructor.call(client, shim)
  }