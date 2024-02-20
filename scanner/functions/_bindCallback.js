function _bindCallback({ context, callback, binder, shim, fn, args, spec, name }) {
  if (shim.isFunction(callback)) {
    callback.call(context, shim, fn, name, spec.segment, args)
  } else if (shim.isNumber(callback)) {
    shim.logger.trace('Binding callback %d segment: %j', callback, !!spec.segment)
    const cbIdx = normalizeIndex(args.length, callback)
    if (cbIdx !== null) {
      if (spec.shouldCreateSegment) {
        binder.call(shim, args, cbIdx, spec.segment)
      } else {
        args[cbIdx] = shim.bindSegment(args[cbIdx], spec.segment, true)
      }
    }
  }
}