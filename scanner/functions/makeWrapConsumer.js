function makeWrapConsumer({ spec, queue, destinationName, destNameIsArg }) {
  const msgDescDefaults = new specs.MessageSubscribeSpec(spec)
  if (destNameIsArg && destinationName != null) {
    msgDescDefaults.destinationName = destinationName
  }
  if (queue != null) {
    msgDescDefaults.queue = queue
  }

  return function wrapConsumer(shim, consumer, cName) {
    if (!shim.isFunction(consumer)) {
      return consumer
    }

    const consumerWrapper = createConsumerWrapper({ shim, consumer, cName, spec: msgDescDefaults })
    return shim.bindCreateTransaction(
      consumerWrapper,
      new specs.TransactionSpec({
        type: shim.MESSAGE,
        nest: true
      })
    )
  }
}