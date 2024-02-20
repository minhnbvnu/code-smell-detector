function wrapGetConnection(shim, connectable) {
  if (!connectable || !connectable.getConnection || shim.isWrapped(connectable.getConnection)) {
    shim.logger.trace(
      {
        connectable: !!connectable,
        getConnection: !!(connectable && connectable.getConnection),
        isWrapped: !!(connectable && shim.isWrapped(connectable.getConnection))
      },
      'Not wrapping getConnection'
    )
    return false
  }

  const proto = Object.getPrototypeOf(connectable)
  shim.wrap(proto, 'getConnection', function doWrapGetConnection(shim, fn) {
    return function wrappedGetConnection() {
      const args = shim.toArray(arguments)
      const cbIdx = args.length - 1

      // avoid an infinite loop and check both the cb and the "original" cb before re-wrapping
      // this is only applicable now with the security agent + us doing the same thing
      const original = shim.getOriginalOnce(args[cbIdx])
      if (
        shim.isFunction(args[cbIdx]) &&
        !(shim.isWrapped(args[cbIdx]) || shim.isWrapped(original))
      ) {
        shim.logger.trace(
          {
            hasSegment: !!shim.getSegment()
          },
          'Wrapping callback with segment'
        )
        let cb = args[cbIdx]
        if (!shim[symbols.wrappedPoolConnection]) {
          cb = shim.wrap(cb, wrapGetConnectionCallback)
        }
        args[cbIdx] = shim.bindSegment(cb)
      }
      return fn.apply(this, args)
    }
  })

  return true
}