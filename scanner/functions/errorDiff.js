function errorDiff(err, type, escape) {
  var actual   = escape ? escapeInvisibles(err.actual)   : err.actual;
  var expected = escape ? escapeInvisibles(err.expected) : err.expected;
  return diff['diff' + type](actual, expected).map(function(str){
    if (str.added) return colorLines('diff added', str.value);
    if (str.removed) return colorLines('diff removed', str.value);
    return str.value;
  }).join('');
}