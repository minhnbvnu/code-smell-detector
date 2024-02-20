function createSubscriberWrapper({ shim, fn, spec, destNameIsArg }) {
  return function wrappedSubscribe() {
    const args = shim.argsToArray.apply(shim, arguments)
    const queueIdx = shim.normalizeIndex(args.length, spec.queue)
    const consumerIdx = shim.normalizeIndex(args.length, spec.consumer)
    const queue = queueIdx === null ? null : args[queueIdx]
    let destinationName = null

    if (destNameIsArg) {
      const destNameIdx = shim.normalizeIndex(args.length, spec.destinationName)
      if (destNameIdx !== null) {
        destinationName = args[destNameIdx]
      }
    }

    if (consumerIdx !== null) {
      args[consumerIdx] = shim.wrap(
        args[consumerIdx],
        makeWrapConsumer({ spec, queue, destinationName, destNameIsArg })
      )
    }

    return fn.apply(this, args)
  }
}