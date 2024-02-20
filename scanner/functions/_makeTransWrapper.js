function _makeTransWrapper(shim, fn, name, spec) {
  return function transactionWrapper() {
    // Don't nest transactions, reuse existing ones!
    const existingTransaction = shim.tracer.getTransaction()
    if (!shim.agent.canCollectData() || existingTransaction) {
      return fn.apply(this, arguments)
    }

    shim.logger.trace('Creating new %s transaction for %s', spec.type, name)
    const transaction = new Transaction(shim.agent)
    transaction.type = spec.type
    return shim.applySegment(fn, transaction.trace.root, false, this, arguments)
  }
}