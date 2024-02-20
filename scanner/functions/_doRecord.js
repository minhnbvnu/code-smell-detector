function _doRecord({ segment, args, segDesc, shouldCreateSegment, shim, fn, name }) {
  // Now bind any callbacks specified in the segment descriptor.
  _bindAllCallbacks.call(this, shim, fn, name, args, {
    spec: segDesc,
    segment: segment,
    shouldCreateSegment: shouldCreateSegment
  })

  // Apply the function, and (if it returned a stream) bind that too.
  // The reason there is no check for `segment` is because it should
  // be guaranteed by the parent and active transaction check
  // at the beginning of this function.
  let ret = _applyRecorderSegment({ segment, ctx: this, args, segDesc, shim, fn, name })
  if (ret) {
    if (segDesc.stream) {
      shim.logger.trace('Binding return value as stream.')
      _bindStream(shim, ret, segment, {
        event: shim.isString(segDesc.stream) ? segDesc.stream : null,
        shouldCreateSegment: shouldCreateSegment
      })
    } else if (segDesc.promise && shim.isPromise(ret)) {
      shim.logger.trace('Binding return value as Promise.')
      ret = shim.bindPromise(ret, segment)
    }
  }
  return ret
}