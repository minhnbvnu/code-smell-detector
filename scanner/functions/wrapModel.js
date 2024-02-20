function wrapModel(shim, Model, promiseMode) {
  if (!Model.Channel?.prototype) {
    shim.logger.debug(
      `Could not get ${promiseMode ? 'promise' : 'callback'} model Channel to instrument.`
    )
  }

  const proto = Model.Channel.prototype
  if (shim.isWrapped(proto.consume)) {
    shim.logger.trace(`${promiseMode ? 'promise' : 'callback'} model already instrumented.`)
    return
  }

  shim.record(proto, CHANNEL_METHODS, function recordChannelMethod(shim, fn, name) {
    return {
      name: 'Channel#' + name,
      callback: setCallback(shim, promiseMode),
      promise: promiseMode
    }
  })

  shim.recordConsume(proto, 'get', {
    destinationName: shim.FIRST,
    callback: setCallback(shim, promiseMode),
    promise: promiseMode,
    messageHandler: function handleConsumedMessage(shim, fn, name, message) {
      // the message is the param when using the promised based model
      message = promiseMode ? message : message[1]
      if (!message) {
        shim.logger.trace('No results from consume.')
        return null
      }
      const parameters = Object.create(null)
      getParameters(parameters, message.fields)
      getParameters(parameters, message.properties)

      const headers = message?.properties?.headers

      return { parameters, headers }
    }
  })

  shim.recordPurgeQueue(proto, 'purgeQueue', function recordPurge(shim, fn, name, args) {
    let queue = args[0]
    if (TEMP_RE.test(queue)) {
      queue = null
    }
    return { queue, promise: promiseMode, callback: setCallback(shim, promiseMode) }
  })

  shim.recordSubscribedConsume(proto, 'consume', {
    name: 'amqplib.Channel#consume',
    queue: shim.FIRST,
    consumer: shim.SECOND,
    promise: promiseMode,
    callback: promiseMode ? null : shim.FOURTH,
    messageHandler: describeMessage
  })
}