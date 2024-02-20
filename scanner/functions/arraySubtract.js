function arraySubtract(a, b) {
  var diff = [],
      alen = a.length,
      blen = b.length,
      i, j;
  for (i=0; i<alen; i++) {
    diff.push(a[i]);
    for (j=0; j<blen; j++) {
      if (a[i] === b[j]) {
        diff.pop();
        break;
      }
    }
  }
  return diff;
}