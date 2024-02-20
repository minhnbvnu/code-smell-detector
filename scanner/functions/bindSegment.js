function bindSegment(nodule, property, segment, full) {
  // Don't bind to null arguments.
  if (!nodule) {
    return nodule
  }

  // Determine our arguments.
  if (this.isObject(property) && !this.isArray(property)) {
    // bindSegment(func, segment [, full])
    full = segment
    segment = property
    property = null
  }

  // This protects against the `bindSegment(func, null, true)` case, where the
  // segment is `null`, and thus `true` (the full param) is detected as the
  // segment.
  if (segment != null && !this.isObject(segment)) {
    this.logger.debug({ segment: segment }, 'Segment is not a segment, not binding.')
    return nodule
  }

  return this.wrap(nodule, property, function wrapFunc(shim, func) {
    if (!shim.isFunction(func)) {
      return func
    }

    // Wrap up the function with this segment.
    segment = segment || shim.getSegment()
    if (!segment) {
      return func
    }

    const binder = _makeBindWrapper(shim, func, segment, full || false)
    shim.storeSegment(binder, segment)
    return binder
  })
}