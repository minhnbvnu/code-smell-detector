function typeMatches(defType, argType, arg) {
  if(defType.match(/^p5\./)) {
    var parts = defType.split('.');
    return arg instanceof p5[parts[1]];
  }
  return defType === 'Boolean' || // Anything is truthy, cover in Debug Guide
    (defType.toLowerCase() === argType) ||
    (numberTypes.indexOf(defType) > -1 && isNumeric(arg));
}