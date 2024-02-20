function bindCreateTransaction(nodule, property, spec) {
  if (this.isObject(property) && !this.isArray(property)) {
    // bindCreateTransaction(nodule, spec)
    spec = property
    property = null
  }

  // Refuse to perform the wrapping if `spec.type` is not valid.
  if (!TRANSACTION_TYPES_SET[spec.type]) {
    this.logger.error(
      { stack: new Error().stack },
      'Invalid spec type "%s", must be one of %j.',
      spec.type,
      Object.keys(TRANSACTION_TYPES_SET)
    )
    return nodule
  }

  // Perform the actual wrapping.
  return this.wrap(nodule, property, function makeTransWrapper(shim, fn, name) {
    if (!shim.isFunction(fn)) {
      shim.logger.debug('Not wrapping "%s" with transaction, not a function.', name)
      return fn
    }

    // Is this transaction supposed to be nested? Pick the right wrapper for the
    // job.
    const makeWrapper = spec.nest ? _makeNestedTransWrapper : _makeTransWrapper
    return makeWrapper(shim, fn, name, spec)
  })
}