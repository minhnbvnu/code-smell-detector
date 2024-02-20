function bindConsumer({ shim, fn, fnName, args, msgDesc, segment, getParams, resHandler }) {
  // Call the method in the context of our segment.
  let ret = shim.applySegment(fn, segment, true, this, args)

  if (ret && msgDesc.promise && shim.isPromise(ret)) {
    ret = shim.bindPromise(ret, segment)

    // Intercept the promise to handle the result.
    if (resHandler) {
      ret = ret.then(function interceptValue(res) {
        const msgProps = resHandler.call(this, shim, fn, fnName, res)
        if (getParams && msgProps && msgProps.parameters) {
          shim.copySegmentParameters(segment, msgProps.parameters)
        }
        return res
      })
    }
  }

  return ret
}