function recordConsume(nodule, properties, spec) {
  if (this.isObject(properties) && !this.isArray(properties)) {
    // recordConsume(func, spec)
    spec = properties
    properties = null
  }
  if (!this.isFunction(spec)) {
    spec = new specs.MessageSpec(spec)
  }

  // This is using wrap instead of record because the spec allows for a messageHandler
  // which is being used to handle the result of the callback or promise of the
  // original wrapped consume function.
  // TODO: https://github.com/newrelic/node-newrelic/issues/981
  return this.wrap(nodule, properties, function wrapConsume(shim, fn, fnName) {
    if (!shim.isFunction(fn)) {
      shim.logger.debug('Not wrapping %s (%s) as consume', fn, fnName)
      return fn
    }

    return createRecorder({ shim, fn, fnName, spec })
  })
}