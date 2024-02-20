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