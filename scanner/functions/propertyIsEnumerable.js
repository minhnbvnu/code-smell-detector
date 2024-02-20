function propertyIsEnumerable(object, key){
  return Object.prototype.propertyIsEnumerable.call(object, key)
}