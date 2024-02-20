function _safeWrap(obj, name, methods, wrapper) {
  if (methods && methods.length) {
    shimmer.wrapMethod(obj, name, methods, wrapper)
  }
}