function wrapFunction(name, recorder, original, wrapper, resp) {
  if (typeof original !== 'function' || !wrapper) {
    logger.trace(SKIP_WRAPPING_FUNCTION_MESSAGE, name)
    return original
  }

  logger.trace('Wrapping %s using a custom wrapper', name)

  const tracer = this

  return wrappedFunction

  function wrappedFunction() {
    const transaction = tracer.getTransaction()
    if (!transaction) {
      logger.trace(INACTIVE_TRANSACTION_MESSAGE, name)
      return original.apply(this, arguments)
    }

    logger.trace(CREATE_SEGMENT_MESSAGE, name, transaction.id)

    const child = tracer.createSegment(name, recorder)
    const args = wrapper.call(this, child, tracer.slice(arguments), bind)
    child.start()
    let result = tracer.bindFunction(original, child).apply(this, args)
    if (resp) {
      result = resp.call(this, child, result, bind)
    }
    return result

    function bind(fn) {
      if (!fn) {
        return fn
      }
      return tracer.wrapCallback(fn, child, function nrWrappedHandler() {
        logger.trace('Touching "%s" segment for transaction %s.', name, transaction.id)
        child.touch()
        return fn.apply(this, arguments)
      })
    }
  }
}