function bindCallbackSegment(args, cbIdx, parentSegment) {
  if (!args) {
    return
  }

  if (this.isNumber(cbIdx)) {
    const normalizedCBIdx = normalizeIndex(args.length, cbIdx)
    if (normalizedCBIdx === null) {
      // Bad index.
      this.logger.debug(
        'Invalid index %d for args of length %d, not binding callback segment',
        cbIdx,
        args.length
      )
      return
    }
    cbIdx = normalizedCBIdx
  }

  // Pull out the callback and make sure it is a function.
  const cb = args[cbIdx]
  if (this.isFunction(cb)) {
    const shim = this
    const realParent = parentSegment || shim.getSegment()
    args[cbIdx] = shim.wrap(cb, null, function callbackWrapper(shim, fn, name) {
      return function wrappedCallback() {
        if (realParent) {
          realParent.opaque = false
        }
        const segment = _rawCreateSegment(
          shim,
          new specs.SegmentSpec({
            name: 'Callback: ' + name,
            parent: realParent
          })
        )

        if (segment) {
          segment.async = false
        }

        // CB may end the transaction so update the parent's time preemptively.
        realParent && realParent.touch()
        return shim.applySegment(cb, segment, true, this, arguments)
      }
    })
    shim.storeSegment(args[cbIdx], realParent)
  }
}