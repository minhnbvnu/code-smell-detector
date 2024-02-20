function getOriginalOnce(nodule, property) {
  if (!nodule) {
    return nodule
  }

  const original = property ? nodule[property] : nodule
  return original[symbols.original]
}