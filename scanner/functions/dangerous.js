function dangerous(segment) {
    return tracer.bindFunction(function bound() {
      // next tick to avoid tap error handler
      process.nextTick(function ohno() {
        t.equal(contextManager.getContext(), segment)
        throw error
      })
    }, segment)
  }