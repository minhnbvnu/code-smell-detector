function createRecorder({ shim, fn, fnName, spec }) {
  return function consumeRecorder() {
    const parent = shim.getSegment()
    if (!parent || !parent.transaction.isActive()) {
      shim.logger.trace('Not recording consume, no active transaction.')
      return fn.apply(this, arguments)
    }

    // Process the message args.
    const args = shim.argsToArray.apply(shim, arguments)
    const msgDesc = updateSpecFromArgs.call(this, { shim, fn, fnName, args, spec })

    // Make the segment if we can.
    if (!msgDesc) {
      shim.logger.trace('Not recording consume, no message descriptor.')
      return fn.apply(this, args)
    }

    const name = _nameMessageSegment(shim, msgDesc, shim._metrics.CONSUME)

    // Adds details needed by createSegment when used with a spec
    msgDesc.name = name
    msgDesc.recorder = genericRecorder
    msgDesc.parent = parent

    const segment = shim.createSegment(msgDesc)
    const getParams = shim.agent.config.message_tracer.segment_parameters.enabled
    const resHandler = shim.isFunction(msgDesc.messageHandler) ? msgDesc.messageHandler : null

    bindCallback({ shim, args, msgDesc, segment, getParams, resHandler })
    return bindConsumer.call(this, {
      shim,
      fn,
      fnName,
      args,
      msgDesc,
      segment,
      getParams,
      resHandler
    })
  }
}