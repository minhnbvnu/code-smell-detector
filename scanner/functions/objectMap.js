function objectMap(obj, cb) {
  const hasOwn = Object.prototype.hasOwnProperty
  const newObj = {}
  for (const index in obj) {
    if (hasOwn.call(obj, index)) {
      newObj[index] = cb.call(obj, obj[index], index, obj)
    }
  }
  return newObj
}