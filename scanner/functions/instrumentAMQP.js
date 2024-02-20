function instrumentAMQP(shim, amqp, promiseMode) {
  if (!amqp || !amqp.connect) {
    shim.logger.debug("This module is not the amqplib we're looking for.")
    return
  }

  if (shim.isWrapped(amqp.connect)) {
    shim.logger.trace('This module has already been instrumented, skipping.')
    return
  }
  shim.setLibrary(shim.RABBITMQ)

  wrapConnect(shim, amqp, promiseMode)
  wrapChannel(shim)
}