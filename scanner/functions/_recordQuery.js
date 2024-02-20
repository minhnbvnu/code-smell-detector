function _recordQuery(suffix, nodule, properties, querySpec) {
  if (this.isObject(properties) && !this.isArray(properties)) {
    // _recordQuery(suffix, func, querySpec)
    querySpec = properties
    properties = null
  }
  if (!querySpec) {
    this.logger.debug('Missing query spec for recordQuery, not wrapping.')
    return nodule
  }

  return this.record(nodule, properties, function queryRecord(shim, fn, fnName, args) {
    shim.logger.trace('Determining query information for %j', fnName)

    let queryDesc = querySpec
    if (shim.isFunction(querySpec)) {
      queryDesc = querySpec.call(this, shim, fn, fnName, args) || Object.create(null)
    }

    // Set some default values, in case they're missing.
    queryDesc = {
      name: fnName,
      callback: null,
      rowCallback: null,
      stream: null,
      after: null,
      promise: null,
      opaque: false,
      inContext: null,
      ...queryDesc
    }

    const parameters = _normalizeParameters.call(shim, queryDesc.parameters || Object.create(null))

    // If we're not actually recording this, then just return the segment
    // descriptor now.
    if (queryDesc?.record === false) {
      return {
        internal: false,
        ...queryDesc,
        parameters
      }
    }

    // Fetch the query string.
    const queryStr = _extractQueryStr.call(shim, fn, fnName, queryDesc, this, args)
    if (!shim.isString(queryStr)) {
      return null
    }

    // Parse the query and assemble the name.
    const parsed = shim.parseQuery(queryStr, this)
    const name = (parsed.collection || 'other') + '/' + parsed.operation + suffix
    shim.logger.trace('Found and parsed query %s -> %s', parsed.type, name)

    // Return the segment descriptor.
    return {
      internal: true,
      ...queryDesc,
      // This name and parameters might override those in the original
      // queryDesc.
      name: shim._metrics.STATEMENT + name,
      parameters,
      recorder: function queryRecorder(segment, scope) {
        if (segment) {
          parsed.recordMetrics(segment, scope)
        }
      }
    }
  })
}