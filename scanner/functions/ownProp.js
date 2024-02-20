function ownProp (obj, field) {
  return Object.prototype.hasOwnProperty.call(obj, field)
}