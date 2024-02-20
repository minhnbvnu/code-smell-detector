function wrapCreatePool(shim, fn, fnName, pool) {
    if (shim[symbols.unwrapPool]) {
      return
    }
    shim.logger.debug('Wrapping Pool#query and Pool#getConnection')
    if (wrapQueryable(shim, pool, true) && wrapGetConnection(shim, pool)) {
      shim[symbols.unwrapPool] = true
    }
  }