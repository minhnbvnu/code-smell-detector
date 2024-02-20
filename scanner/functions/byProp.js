function byProp (prop, val) {
  return function (elem) { return elem[prop] === val }
}