function isObject(value) {
  // http://jsperf.com/isobject4
  return value !== null && typeof value === 'object';
}