function wrapFunctionFirst(name, recorder, original) {
  if (typeof original !== 'function') {
    logger.trace(SKIP_WRAPPING_FUNCTION_MESSAGE, name)
    return original
  }

  logger.trace('Wrapping %s as a callback-first function', name)
  const tracer = this

  return wrappedFunction

  function wrappedFunction() {
    const transaction = tracer.getTransaction()
    if (!transaction) {
      logger.trace(INACTIVE_TRANSACTION_MESSAGE, name)
      return original.apply(this, arguments)
    }

    logger.trace(CREATE_SEGMENT_MESSAGE, name, transaction.id)
    const args = tracer.slice(arguments)
    const cb = args[0]
    if (typeof cb !== 'function') {
      return original.apply(this, arguments)
    }
    const child = tracer.createSegment(name, recorder)
    args[0] = tracer.wrapCallback(cb, child, function wrappedCallback() {
      logger.trace('Ending "%s" segment for transaction %s.', name, transaction.id)
      child.touch()
      return cb.apply(this, arguments)
    })
    child.start()
    return tracer.bindFunction(original, child).apply(this, args)
  }
}