function __isArray(o) {
  return typeof o === 'object' && __objToStr(o) === '[object Array]';
}