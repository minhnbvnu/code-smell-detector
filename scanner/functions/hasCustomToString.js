function hasCustomToString(obj) {
  return isFunction(obj.toString) && obj.toString !== toString;
}