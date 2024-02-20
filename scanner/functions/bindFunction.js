function bindFunction(handler, segment, full) {
  if (typeof handler !== 'function') {
    return handler
  }

  return _makeWrapped(this, handler, segment || this.getSegment(), !!full)
}