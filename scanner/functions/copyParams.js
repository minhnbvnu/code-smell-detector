function copyParams({ spec, shim, fn, fnName, args, req }) {
  // Copy over route parameters onto the transaction root.
  const params = shim.agent.config.high_security
    ? null
    : spec.params.call(this, shim, fn, fnName, args, req)

  // Route parameters are handled here, query parameters are handled in lib/transaction/index.js#_markAsWeb as part of finalization
  return shim.prefixRouteParameters(params)
}