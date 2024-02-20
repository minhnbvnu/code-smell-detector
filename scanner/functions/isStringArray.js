function isStringArray(arr) {
  return _.isArray(arr) && _.every(arr, function(f) { return _.isString(f)});
}