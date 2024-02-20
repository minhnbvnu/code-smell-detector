function objectDiff(a, b) {
  var diff = null;
  for (var k in a) {
    if (a[k] != b[k] && a.hasOwnProperty(k)) {
      diff = diff || {};
      diff[k] = a[k];
    }
  }
  return diff;
}