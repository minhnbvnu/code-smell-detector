function _makeNextBinder(nextDetails, txInfo) {
  return function bindNext(shim, fn, _name, segment, args) {
    if (!segment) {
      return
    }
    txInfo.segmentStack.push(segment)

    nextDetails.wrapNext(
      shim,
      fn,
      _name,
      args,
      wrapNextFn.bind(null, { shim, txInfo, nextDetails, segment })
    )
  }
}