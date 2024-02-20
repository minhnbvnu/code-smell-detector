function _bindStream(shim, stream, segment, spec) {
  if (!segment || !shim.isFunction(stream.emit)) {
    shim.logger.trace(
      'Not binding stream; have segment=%j; typeof emit=%s',
      !!segment,
      typeof stream.emit
    )
    return
  }

  // We have a segment and an emit function, pull out the relevant parts of the
  // spec and prepare to create an event segment.
  const specEvent = spec?.event
  const shouldCreateSegment = spec?.shouldCreateSegment || false
  const segmentName = `Event callback: ${specEvent}`

  wrapStreamEmit({ stream, shim, segment, specEvent, shouldCreateSegment, segmentName })
  wrapStreamListeners({ stream, shim, specEvent, segment })
}