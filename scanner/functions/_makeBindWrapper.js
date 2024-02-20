function _makeBindWrapper(shim, fn, segment, full) {
  return function wrapper() {
    return shim.applySegment(fn, segment, full, this, arguments)
  }
}