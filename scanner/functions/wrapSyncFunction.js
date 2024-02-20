function wrapSyncFunction(name, recorder, original) {
  if (typeof original !== 'function') {
    logger.trace(SKIP_WRAPPING_FUNCTION_MESSAGE, name)
    return original
  }

  logger.trace('Wrapping "%s" as a synchronous function', name)

  const tracer = this

  return wrappedFunction

  function wrappedFunction() {
    const transaction = tracer.getTransaction()
    if (!transaction) {
      logger.trace(INACTIVE_TRANSACTION_MESSAGE, name)
      return original.apply(this, arguments)
    }
    logger.trace('Creating "%s" sync segment for transaction %s.', name, transaction.id)
    const child = tracer.createSegment(name, recorder)
    if (child) {
      child.async = false
    }
    return tracer.bindFunction(original, child, true).apply(this, arguments)
  }
}