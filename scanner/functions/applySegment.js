function applySegment(func, segment, full, context, args, inContextCB) {
  // Exist fast for bad arguments.
  if (!this.isFunction(func)) {
    return
  }

  if (!segment) {
    this.logger.trace('No segment to apply to function.')
    return fnApply.call(func, context, args)
  }

  this.logger.trace('Applying segment %s', segment.name)

  const contextManager = this._contextManager
  const prevSegment = contextManager.getContext()

  return contextManager.runInContext(segment, function runInContextCb() {
    if (full) {
      segment.start()
    }

    if (typeof inContextCB === 'function') {
      inContextCB(segment)
    }

    try {
      return fnApply.call(func, context, args)
    } catch (error) {
      if (prevSegment === null && process.domain != null) {
        process.domain[symbols.segment] = contextManager.getContext()
      }

      throw error // Re-throwing application error, this is not an agent error.
    } finally {
      if (full) {
        segment.touch()
      }
    }
  })
}