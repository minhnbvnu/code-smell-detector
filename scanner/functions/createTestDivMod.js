function createTestDivMod(i, count) {
  return function() {
    var vi = goog.math.Long.fromBits(TEST_BITS[i + 1], TEST_BITS[i]);
    for (var j = 0; j < TEST_BITS.length; j += 2) {
      var vj = goog.math.Long.fromBits(TEST_BITS[j + 1], TEST_BITS[j]);
      if (!vj.isZero()) {
        var divResult = vi.div(vj);
        assertEquals(TEST_DIV_BITS[count++], divResult.getHighBits());
        assertEquals(TEST_DIV_BITS[count++], divResult.getLowBits());

        var modResult = vi.modulo(vj);
        var combinedResult = divResult.multiply(vj).add(modResult);
        assertTrue(vi.equals(combinedResult));
      }
    }
  }
}