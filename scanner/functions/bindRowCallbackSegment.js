function bindRowCallbackSegment(args, cbIdx, parentSegment) {
  const idx = this.normalizeIndex(args.length, cbIdx)
  if (idx === null) {
    this.logger.debug('Not binding row callback, invalid cbIdx %s', cbIdx)
    return
  }

  // Pull out the callback and make sure it is a function.
  const cb = args[idx]
  if (!this.isFunction(cb)) {
    this.logger.debug('Argument %d is not a function, not binding row callback', cbIdx)
    return cb
  }
  this.logger.trace('Wrapping argument %d as a row callback.', cbIdx)

  // We have a little state to maintain through potentially multiple calls.
  let callCounter = 0
  let segment = null
  const segmentName = 'Callback: ' + this.getName(cb)
  const shim = this

  const wrapper = this.bindSegment(function rowCallbackWrapper() {
    // The first time this row callback is fired we want to touch the parent
    // segment and create the callback segment.
    if (++callCounter === 1) {
      const realParent = parentSegment || shim.getSegment()
      realParent && realParent.touch()
      segment = shim.createSegment(segmentName, realParent)

      if (segment) {
        segment.async = false
      }
    }

    // Update the segment name and run the actual callback.
    if (segment) {
      segment.addAttribute('count', callCounter)
    }

    return shim.applySegment(cb, segment, true, this, arguments)
  }, parentSegment)

  shim.assignOriginal(wrapper, cb, true)
  args[idx] = wrapper
}