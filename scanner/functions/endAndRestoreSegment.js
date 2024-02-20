function endAndRestoreSegment(shim, { request, error }) {
  const activeSegment = request[symbols.segment]
  const parentSegment = request[symbols.parentSegment]
  if (activeSegment) {
    activeSegment.end()

    if (error) {
      handleError(shim, activeSegment, error)
    }

    if (parentSegment) {
      shim.setActiveSegment(parentSegment)
    }
  }
}