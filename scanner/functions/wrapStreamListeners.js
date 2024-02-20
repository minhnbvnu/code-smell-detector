function wrapStreamListeners({ stream, shim, segment, specEvent }) {
  // Also wrap up any listeners for end or error events.
  shim.wrap(stream, ['on', 'addListener'], function wrapOn(shim, fn) {
    if (!shim.isFunction(fn)) {
      return fn
    }

    return function wrappedOn(onEvent) {
      if (onEvent !== specEvent && (onEvent === 'end' || onEvent === 'error')) {
        const args = argsToArray.apply(shim, arguments)
        shim.bindCallbackSegment(args, shim.LAST, segment)
        return fn.apply(this, args)
      }
      return fn.apply(this, arguments)
    }
  })
}