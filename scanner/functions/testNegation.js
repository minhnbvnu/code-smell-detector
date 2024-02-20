function testNegation() {
  for (var i = 0; i < TEST_BITS.length; i += 2) {
    var vi = goog.math.Long.fromBits(TEST_BITS[i + 1], TEST_BITS[i]);
    if (TEST_BITS[i + 1] == 0) {
      assertEquals((~TEST_BITS[i] + 1) | 0, vi.negate().getHighBits());
      assertEquals(0, vi.negate().getLowBits());
    } else {
      assertEquals(~TEST_BITS[i], vi.negate().getHighBits());
      assertEquals((~TEST_BITS[i + 1] + 1) | 0, vi.negate().getLowBits());
    }
  }
}