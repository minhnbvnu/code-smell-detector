function wrapFunctionNoSegment(original, name, wrapper) {
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
    let args = tracer.slice(arguments)

    if (wrapper === undefined) {
      const last = args.length - 1
      const cb = args[last]
      if (typeof cb === 'function') {
        args[last] = tracer.bindFunction(cb)
      }
    } else {
      args = wrapper(args)
    }
    return original.apply(this, args)
  }
}