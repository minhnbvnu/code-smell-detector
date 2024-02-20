function isWrapped(nodule, property) {
  if (property) {
    return !!(nodule?.[property]?.[symbols.wrapped] === this.id)
  }
  return !!(nodule?.[symbols.wrapped] === this.id)
}