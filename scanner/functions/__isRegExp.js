function __isRegExp(o) {
  return typeof o === 'object' && __objToStr(o) === '[object RegExp]';
}