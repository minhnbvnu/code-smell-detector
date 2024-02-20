function findWith(o) {
  const oo = toFunction(o)
  const p = isDefinedAt(oo)
  return [arguments[I.LENGTH] > 1 ? find(p, arguments[1]) : find(p), oo]
}