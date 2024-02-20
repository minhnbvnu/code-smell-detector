function _wrapThen(shim, fn, _name, useAllParams) {
  // Don't wrap non-functions.
  if (isWrapped(shim, fn)) {
    return
  }

  return function __NR_wrappedThen() {
    if (!(this instanceof shim._class)) {
      return fn.apply(this, arguments)
    }

    const thenSegment = shim.getSegment()
    const promise = this

    // store isWrapped and current handler on context object to be passed into wrapHandler
    const ctx = { isWrapped: false, handler: null }

    const args = new Array(arguments.length)
    for (let i = 0; i < arguments.length; ++i) {
      args[i] = wrapHandler({
        shim,
        handler: arguments[i],
        index: i,
        argsLength: arguments.length,
        useAllParams,
        ctx
      })
    }
    ctx.handler = fn.apply(this, args)

    // If we got a promise (which we should have), link the parent's context.
    if (!ctx.isWrapped && ctx.handler instanceof shim._class && ctx.handler !== promise) {
      Contextualizer.link(promise, ctx.handler, thenSegment)
    }
    return ctx.handler
  }
}