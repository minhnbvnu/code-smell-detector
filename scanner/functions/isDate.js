function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}