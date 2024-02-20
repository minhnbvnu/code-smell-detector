function _makeNestedTransWrapper(shim, fn, name, spec) {
  return function nestedTransactionWrapper() {
    if (!shim.agent.canCollectData()) {
      return fn.apply(this, arguments)
    }

    // Reuse existing transactions only if the type matches.
    let transaction = shim.tracer.getTransaction()
    let segment = shim.getSegment()

    // Only create a new transaction if we either do not have a current
    // transaction _or_ the current transaction is not of the type we want.
    if (!transaction || spec.type !== transaction.type) {
      shim.logger.trace('Creating new nested %s transaction for %s', spec.type, name)
      transaction = new Transaction(shim.agent)
      transaction.type = spec.type
      segment = transaction.trace.root
    }

    return shim.applySegment(fn, segment, false, this, arguments)
  }
}