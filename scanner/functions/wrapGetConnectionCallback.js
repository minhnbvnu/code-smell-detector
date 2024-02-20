function wrapGetConnectionCallback(shim, cb) {
  return function wrappedGetConnectionCallback(err, conn) {
    try {
      shim.logger.debug('Wrapping PoolConnection#query')
      if (!err && wrapQueryable(shim, conn, false)) {
        // Leave getConnection wrapped in order to maintain TX state, but we can
        // simplify the wrapping of its callback in future calls.
        shim[symbols.wrappedPoolConnection] = true
      }
    } catch (_err) {
      shim.logger.debug(
        { error: _err },
        'Attempt to wrap PoolConnection#query resulted in thrown error'
      )
    }
    return cb.apply(this, arguments)
  }
}