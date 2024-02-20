function wrapEmit(shim, original) {
    return function wrappedEmit(ev) {
      const shouldRestoreContext =
        ev === 'error' && shim.getActiveSegment() === null && shim.getSegment(this)

      if (!shouldRestoreContext) {
        return original.apply(this, arguments)
      }

      shim.setActiveSegment(shim.getSegment(this))
      try {
        return original.apply(this, arguments)
      } finally {
        shim.setActiveSegment(null)
      }
    }
  }