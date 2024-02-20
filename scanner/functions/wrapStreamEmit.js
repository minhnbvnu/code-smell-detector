function wrapStreamEmit({ stream, shim, segment, specEvent, shouldCreateSegment, segmentName }) {
  // Wrap emit such that each event handler is executed within context of this
  // segment or the event-specific segment.
  shim.wrap(stream, 'emit', function wrapEmit(shim, emit) {
    const tx = segment.transaction
    const streamBoundEmit = shim.bindSegment(emit, segment, true)
    let eventSegment = null
    let eventBoundEmit = null
    let emitCount = 0

    if (!shouldCreateSegment) {
      return streamBoundEmit
    }

    return function wrappedEmit(evnt) {
      let emitToCall = streamBoundEmit
      if (evnt === specEvent && tx.isActive()) {
        if (!eventBoundEmit) {
          eventSegment = shim.createSegment(segmentName, segment)
          eventBoundEmit = shim.bindSegment(emit, eventSegment, true)
        }
        eventSegment.addAttribute('count', ++emitCount)
        emitToCall = eventBoundEmit
      }
      if (evnt === 'end' || evnt === 'error') {
        segment.opaque = false
        segment.touch()
      }

      return emitToCall.apply(this, arguments)
    }
  })
}