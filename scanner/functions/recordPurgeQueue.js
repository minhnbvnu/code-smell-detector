function recordPurgeQueue(nodule, properties, spec) {
  if (!nodule) {
    this.logger.debug('Not wrapping non-existent nodule.')
    return nodule
  }

  // Sort out the parameters.
  if (!this.isString(properties) && !this.isArray(properties)) {
    // recordPurgeQueue(nodule, spec)
    spec = properties
    properties = null
  }

  // Fill the spec with defaults.
  const specIsFunction = this.isFunction(spec)
  if (!specIsFunction) {
    spec = new specs.MessageSpec(spec || {})
  }

  return this.record(nodule, properties, function purgeRecorder(shim, fn, name, args) {
    let descriptor = spec
    if (specIsFunction) {
      descriptor = spec.apply(this, arguments)
    }

    let queue = descriptor.queue
    if (shim.isNumber(queue)) {
      const queueIdx = shim.normalizeIndex(args.length, descriptor.queue)
      queue = args[queueIdx]
    }

    return {
      name: _nameMessageSegment(
        shim,
        {
          destinationType: shim.QUEUE,
          destinationName: queue
        },
        shim._metrics.PURGE
      ),
      recorder: genericRecorder,
      callback: descriptor.callback,
      promise: descriptor.promise,
      internal: descriptor.internal
    }
  })
}