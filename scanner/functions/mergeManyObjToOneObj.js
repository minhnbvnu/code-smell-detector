function mergeManyObjToOneObj (obj) {
  var newObj = {}
  if (obj && typeof obj === 'object') {
    for (var f in obj) {
      if (typeof obj[f] === 'function') {
        newObj[f] = obj[f]
      }
      if (typeof obj[f] === 'object') {
        Object.assign(newObj, mergeManyObjToOneObj(obj[f]))
      }
    }
  }
  return newObj
}