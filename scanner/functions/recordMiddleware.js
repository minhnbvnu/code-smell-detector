function recordMiddleware(nodule, properties, spec) {
  if (this.isObject(properties) && !this.isArray(properties)) {
    // recordMiddleware(func, spec)
    spec = properties
    properties = null
  }
  spec = spec || Object.create(null)

  const mwSpec = new specs.MiddlewareSpec(spec)
  const wrapSpec = new specs.WrapSpec(function wrapMiddleware(shim, middleware) {
    return _recordMiddleware(shim, middleware, mwSpec)
  })

  copyExpectedSpecParameters(wrapSpec, spec)

  return this.wrap(nodule, properties, wrapSpec)
}