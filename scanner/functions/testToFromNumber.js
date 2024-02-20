function testToFromNumber() {
  for (var i = 0; i < TEST_BITS.length; i += 2) {
    var num = TEST_BITS[i] * Math.pow(2, 32) + TEST_BITS[i + 1] >= 0 ?
        TEST_BITS[i + 1] :
        Math.pow(2, 32) + TEST_BITS[i + 1];
    var val = goog.math.Long.fromNumber(num);
    assertEquals(num, val.toNumber());
  }
  // Test edge cases
  assertEquals(goog.math.Long.getZero(), goog.math.Long.fromNumber(NaN));
  assertEquals(
      goog.math.Long.getMaxValue(), goog.math.Long.fromNumber(Infinity));
  assertEquals(
      goog.math.Long.getMinValue(), goog.math.Long.fromNumber(-Infinity));
}