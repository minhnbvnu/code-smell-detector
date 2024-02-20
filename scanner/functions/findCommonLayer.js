function findCommonLayer(a, b) {
  var p = null;
  if (a == b) {
    p = a;
  }
  if (!p && a.parent.typename == 'Layer') {
    p = findCommonLayer(a.parent, b);
  }
  if (!p && b.parent.typename == 'Layer') {
    p = findCommonLayer(a, b.parent);
  }
  return p;
}