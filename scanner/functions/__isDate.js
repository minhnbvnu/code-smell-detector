function __isDate(o) {
  return typeof o === 'object' && __objToStr(o) === '[object Date]';
}