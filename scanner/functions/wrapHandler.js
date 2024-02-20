function wrapHandler({ handler, index, argsLength, useAllParams, ctx, shim }) {
  if (
    isWrapped(shim, handler) ||
    (!useAllParams && index !== argsLength - 1) // Don't want all and not last
  ) {
    ctx.isWrapped = shim.isWrapped(handler)
    return handler
  }

  return function __NR_wrappedThenHandler() {
    if (!ctx.handler || !ctx.handler[symbols.context]) {
      return handler.apply(this, arguments)
    }

    let promSegment = ctx.handler[symbols.context].getSegment()
    const segment = promSegment || shim.getSegment()
    if (segment && segment !== promSegment) {
      ctx.handler[symbols.context].setSegment(segment)
      promSegment = segment
    }

    let ret = null
    try {
      ret = shim.applySegment(handler, promSegment, true, this, arguments)
    } finally {
      if (ret && typeof ret.then === 'function') {
        ret = ctx.handler[symbols.context].continueContext(ret)
      }
    }
    return ret
  }
}