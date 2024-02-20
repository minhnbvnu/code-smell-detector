function transactionNestProxy(type, handler) {
  if (handler === undefined && typeof type === 'function') {
    handler = type
    type = undefined
  }
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
    let transaction = tracer.getTransaction()
    let segment = tracer.getSegment()

    let createNew = false

    if (!transaction || transaction.type !== type) {
      createNew = true
    }

    if (createNew) {
      transaction = new Transaction(tracer.agent)
      transaction.type = type
      segment = transaction.trace.root
    }

    return tracer.bindFunction(handler, segment).apply(this, arguments)
  }

  wrapped[symbols.original] = handler

  return wrapped
}