function wrapNoSegment(shim, fn) {
  return function wrappedZLibNoSegment() {
    if (!shim.getActiveSegment()) {
      return fn.apply(this, arguments)
    }

    const args = shim.argsToArray.apply(shim, arguments)
    const cbIndex = args.length - 1

    shim.bindSegment(args, cbIndex)

    return fn.apply(this, args)
  }
}