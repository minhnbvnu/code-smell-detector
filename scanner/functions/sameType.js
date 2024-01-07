function sameType(a, b) {
  return objToString.call(a) === objToString.call(b);
}