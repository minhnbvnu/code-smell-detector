function serverFactoryWrapper(shim, fn, fnName, server) {
  serverPostConstructor.call(server, shim)
}