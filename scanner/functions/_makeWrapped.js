function _makeWrapped(tracer, handler, active, full) {
  wrapped[symbols.original] = getOriginal(handler)
  wrapped[symbols.segment] = active

  return wrapped

  function wrapped() {
    const prev = tracer.getSegment()

    if (active && full) {
      active.start()
    }

    try {
      return tracer._contextManager.runInContext(active, handler, this, arguments)
    } catch (err) {
      logger.trace(err, 'Error from wrapped function:')

      if (prev === null && process.domain != null) {
        process.domain[symbols.segment] = tracer.getSegment()
      }

      throw err // Re-throwing application error, this is not an agent error.
    } finally {
      if (active && full) {
        active.touch()
      }
    }
  }
}