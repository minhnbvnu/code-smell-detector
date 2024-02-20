function arrayDiffer(a, b) {
  if (a == null || b == null) {
    return true;
  }
  if (a.length !== b.length) {
    return true;
  }
  for (var i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) {
      return true;
    }
  }
  return false;
}