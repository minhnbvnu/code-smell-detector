function recordSubscribedConsume(nodule, properties, spec) {
  if (!nodule) {
    this.logger.debug('Not wrapping non-existent nodule.')
    return nodule
  }

  // Sort out the parameters.
  if (this.isObject(properties) && !this.isArray(properties)) {
    // recordSubscribedConsume(nodule, spec)
    spec = properties
    properties = null
  }

  spec = new specs.MessageSubscribeSpec(spec)

  // Make sure our spec has what we need.
  if (!this.isFunction(spec.messageHandler)) {
    this.logger.debug('spec.messageHandler should be a function')
    return nodule
  } else if (!this.isNumber(spec.consumer)) {
    this.logger.debug('spec.consumer is required for recordSubscribedConsume')
    return nodule
  }

  const destNameIsArg = this.isNumber(spec.destinationName)

  // Must wrap the subscribe method independently to ensure that we can wrap
  // the consumer regardless of transaction state.
  const wrapped = this.wrap(nodule, properties, function wrapSubscribe(shim, fn) {
    if (!shim.isFunction(fn)) {
      return fn
    }

    return createSubscriberWrapper({ shim, fn, spec, destNameIsArg })
  })

  // Wrap the subscriber with segment creation.
  return this.record(wrapped, properties, function recordSubscribe(shim, fn, name, args) {
    // Make sure the specified consumer and callback indexes do not overlap.
    // This could happen for instance if the function signature is
    // `fn(consumer [, callback])` and specified as `consumer: shim.FIRST`,
    // `callback: shim.LAST`.
    const consumerIdx = shim.normalizeIndex(args.length, spec.consumer)
    let cbIdx = shim.normalizeIndex(args.length, spec.callback)
    if (cbIdx === consumerIdx) {
      cbIdx = null
    }

    return {
      name: spec.name || name,
      callback: cbIdx,
      promise: spec.promise,

      stream: false,
      internal: false
    }
  })
}