function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}