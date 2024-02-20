function partsOf(t) {
  if (arguments[I.LENGTH] !== 1) t = toFunction(compose.apply(null, arguments))
  return function partsOf(x, i, F, xi2yF) {
    return F.map(y => disperseU(t, y, x), xi2yF(collectTotal(t, x), i))
  }
}