function _makeValueSet(obj) {
  return Object.keys(obj)
    .map((t) => obj[t])
    .reduce(function reduceToMap(o, t) {
      o[t] = true
      return o
    }, Object.create(null))
}