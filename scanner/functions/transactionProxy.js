function transactionProxy(handler) {
  // if there's no handler, there's nothing to proxy.
  if (typeof handler !== 'function') {
    return handler
  }

  const tracer = this
  const wrapped = function wrapTransactionInvocation() {
    if (!tracer.agent.canCollectData()) {
      return handler.apply(this, arguments)
    }

    // don't nest transactions, reuse existing ones
    const segment = tracer.getSegment()
    if (segment) {
      if (segment.transaction.traceStacks) {
        segment.probe('!!! Nested transaction creation !!!')
        segment.transaction.traceFlag = true // Will log the stacks when it ends.
      }
      logger.warn(
        {
          transaction: { id: segment.transaction.id, name: segment.transaction.getName() },
          segment: segment.name
        },
        'Active transaction when creating non-nested transaction'
      )
      tracer.agent.recordSupportability('Nodejs/Transactions/Nested')
      return handler.apply(this, arguments)
    }
    const transaction = new Transaction(tracer.agent)
    return tracer.bindFunction(handler, transaction.trace.root, true).apply(this, arguments)
  }

  wrapped[symbols.original] = handler

  return wrapped
}