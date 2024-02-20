function wrapCreateConnection(shim, fn, fnName, connection) {
    if (shim[symbols.unwrapConnection]) {
      return
    }
    shim.logger.debug('Wrapping Connection#query')
    if (wrapQueryable(shim, connection, false)) {
      const connProto = Object.getPrototypeOf(connection)
      connProto[symbols.storeDatabase] = true
      shim[symbols.unwrapConnection] = true
    }
  }