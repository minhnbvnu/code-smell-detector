function isSimpleObject(thing) {
  return Object.prototype.toString.call(thing) === '[object Object]' && thing !== null
}