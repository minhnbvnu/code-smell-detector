function testToFromInt() {
  for (var i = 0; i < TEST_BITS.length; i += 1) {
    var val = goog.math.Long.fromInt(TEST_BITS[i]);
    assertEquals(TEST_BITS[i], val.toInt());
  }
}