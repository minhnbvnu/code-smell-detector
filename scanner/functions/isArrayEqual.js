function isArrayEqual(a, b) {

  if (a.length !== b.length) return false;

  for (var i = 0, il = a.length; i < il; i++) {

    if (a[i] !== b[i]) return false;

  }

  return true;

}