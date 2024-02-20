function _makeNonEnumerable(obj, prop) {
  try {
    const desc = Object.getOwnPropertyDescriptor(obj, prop)
    desc.enumerable = false
    Object.defineProperty(obj, prop, desc)
  } catch (e) {
    logger.debug(e, 'Failed to make %s non enumerable.', prop)
  }
}