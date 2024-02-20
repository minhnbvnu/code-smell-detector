function recordParamware(nodule, properties, spec) {
  if (this.isObject(properties) && !this.isArray(properties)) {
    // recordParamware(func, spec)
    spec = properties
    properties = null
  }
  spec = spec || Object.create(null)

  const mwSpec = new specs.MiddlewareSpec(spec)
  if (spec && this.isString(spec.name)) {
    mwSpec.route = '[param handler :' + spec.name + ']'
  } else {
    mwSpec.route = '[param handler]'
  }
  mwSpec.type = MIDDLEWARE_TYPE_NAMES.PARAMWARE

  const wrapSpec = new specs.WrapSpec(function wrapParamware(shim, middleware, name) {
    mwSpec.name = name
    return _recordMiddleware(shim, middleware, mwSpec)
  })

  copyExpectedSpecParameters(wrapSpec, spec)

  return this.wrap(nodule, properties, wrapSpec)
}