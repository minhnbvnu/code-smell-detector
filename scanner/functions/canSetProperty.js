function canSetProperty(object, property, primitives){
  if (property === '__proto__' || primitives.isPrimitive(object)){
    return false
  } else if (object != null){

    if (hasOwnProperty(object, property)){
      if (propertyIsEnumerable(object, property)){
        return true
      } else {
        return false
      }
    } else {
      return canSetProperty(primitives.getPrototypeOf(object), property, primitives)
    }

  } else {
    return true
  }
}