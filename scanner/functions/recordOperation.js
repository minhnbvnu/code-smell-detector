function recordOperation(nodule, properties, opSpec) {
  if (this.isObject(properties) && !this.isArray(properties)) {
    // operation(func, opSpec)
    opSpec = properties
    properties = null
  }
  if (!opSpec) {
    opSpec = Object.create(null)
  }

  return this.record(nodule, properties, function opRecorder(shim, fn, fnName, args) {
    shim.logger.trace('Recording datastore operation "%s"', fnName)

    // Derive the segment information, starting from some defaults
    let segDesc = null
    if (shim.isFunction(opSpec)) {
      segDesc = opSpec.call(this, shim, fn, fnName, args)
    } else {
      segDesc = {
        name: fnName || 'other',
        opaque: false,
        after: null,
        promise: null,
        ...opSpec
      }
    }
    if (hasOwnProperty(segDesc, 'parameters')) {
      _normalizeParameters.call(shim, segDesc.parameters)
    }

    // Adjust the segment name with the metric prefix and add a recorder.
    if (!hasOwnProperty(segDesc, 'record') || segDesc.record !== false) {
      segDesc.name = shim._metrics.OPERATION + segDesc.name
      segDesc.recorder = _recordOperationMetrics.bind(shim)

      segDesc.internal = true
    }

    // And done.
    return segDesc
  })
}