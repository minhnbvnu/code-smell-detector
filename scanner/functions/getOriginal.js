function getOriginal(fn) {
  const original = fn[symbols.original]
  if (original) {
    return original
  }
  return fn
}