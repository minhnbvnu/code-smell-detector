function assertNotEq(a, b) {
  if(a == b) {
    throw "assertion failed: " + a + " == " + b;
  }
  return true;
}