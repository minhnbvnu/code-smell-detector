function wrapClearTimeout(_shim, fn) {
  return function wrappedClearTimeout(timer) {
    if (timer && timer._onTimeout) {
      const segment = timer._onTimeout[symbols.segment]
      if (segment && !segment.opaque) {
        segment.ignore = true
      }
    }

    return fn.apply(this, arguments)
  }
}