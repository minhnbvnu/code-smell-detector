function wrapFunctionFirstNoSegment(original, name) {
  if (typeof original !== 'function') {
    return original
  }

  logger.trace('Wrapping function %s (no segment)', name || original.name || 'anonymous')
  const tracer = this

  return wrappedFunction

  function wrappedFunction() {
    if (!tracer.getTransaction()) {
      return original.apply(this, arguments)
    }
    const args = tracer.slice(arguments)
    const cb = args[0]
    if (typeof cb === 'function') {
      args[0] = tracer.bindFunction(cb)
    }
    return original.apply(this, args)
  }
}