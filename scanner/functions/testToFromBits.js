function testToFromBits() {
  for (var i = 0; i < TEST_BITS.length; i += 2) {
    var val = goog.math.Long.fromBits(TEST_BITS[i + 1], TEST_BITS[i]);
    assertEquals(TEST_BITS[i], val.getHighBits());
    assertEquals(TEST_BITS[i + 1], val.getLowBits());
  }
}