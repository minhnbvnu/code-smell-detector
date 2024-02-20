function isRealNaN(x) {
  return typeof x === 'number' && isNaN(x)
}