function assertPairEq(a, b) {
  if(a[0] != b[0] || a[1] != b[1]) {
    throw "assertion failed: " + utils.paddr(a) + " != " + utils.paddr(b);
  }
  return true;
}