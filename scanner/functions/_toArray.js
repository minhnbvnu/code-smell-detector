function _toArray(arr) {
  return arrayWithHoles(arr) || iterableToArray(arr) || nonIterableRest();
}