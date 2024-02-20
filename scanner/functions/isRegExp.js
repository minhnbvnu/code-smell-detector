function isRegExp(value) {
  return toString.call(value) === '[object RegExp]';
}