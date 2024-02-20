function _rawCreateSegment(shim, opts) {
  // Grab parent segment when none in opts so we can check opaqueness
  opts.parent = opts.parent || shim.getActiveSegment()

  // When parent exists and is opaque, no new segment will be created
  // by tracer.createSegment and the parent will be returned. We bail
  // out early so we do not risk modifying the parent segment.
  if (opts.parent && opts.parent.opaque) {
    shim.logger.trace(opts, 'Did not create segment because parent is opaque')
    return opts.parent
  }

  const segment = shim.tracer.createSegment(opts.name, opts.recorder, opts.parent)
  if (segment) {
    segment.internal = opts.internal
    segment.opaque = opts.opaque
    segment.shim = shim

    if (hasOwnProperty(opts, 'parameters')) {
      shim.copySegmentParameters(segment, opts.parameters)
    }
    shim.logger.trace(opts, 'Created segment')
  } else {
    shim.logger.debug(opts, 'Failed to create segment')
  }

  return segment
}