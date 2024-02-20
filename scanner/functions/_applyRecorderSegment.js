function _applyRecorderSegment({ segment, ctx, args, segDesc, shim, fn, name }) {
  let error = null
  let promised = false
  let ret
  try {
    ret = shim.applySegment(fn, segment, true, ctx, args, segDesc.inContext)
    if (segDesc.after && segDesc.promise && shim.isPromise(ret)) {
      promised = true
      return ret.then(
        function onThen(val) {
          segment.touch()
          segDesc.after(shim, fn, name, null, val, segment)
          return val
        },
        function onCatch(err) {
          segment.touch()
          segDesc.after(shim, fn, name, err, null, segment)
          throw err // NOTE: This is not an error from our instrumentation.
        }
      )
    }
    return ret
  } catch (err) {
    error = err
    throw err // Just rethrowing this error, not our error!
  } finally {
    if (segDesc.after && (error || !promised)) {
      segDesc.after(shim, fn, name, error, ret, segment)
    }
  }
}