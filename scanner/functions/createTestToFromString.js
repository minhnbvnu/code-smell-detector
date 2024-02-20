function createTestToFromString(i) {
  return function() {
    var vi = goog.math.Long.fromBits(TEST_BITS[i + 1], TEST_BITS[i]);
    var str = vi.toString(10);
    assertEquals(TEST_STRINGS[i / 2], str);
    assertEquals(
        TEST_BITS[i], goog.math.Long.fromString(str, 10).getHighBits());
    assertEquals(
        TEST_BITS[i + 1], goog.math.Long.fromString(str, 10).getLowBits());

    for (var radix = 2; radix <= 36; ++radix) {
      var result = vi.toString(radix);
      assertEquals(
          TEST_BITS[i], goog.math.Long.fromString(result, radix).getHighBits());
      assertEquals(
          TEST_BITS[i + 1],
          goog.math.Long.fromString(result, radix).getLowBits());
    }
  }
}