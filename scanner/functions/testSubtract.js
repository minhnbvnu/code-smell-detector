function testSubtract() {
  var count = 0;
  for (var i = 0; i < TEST_BITS.length; i += 2) {
    var vi = goog.math.Long.fromBits(TEST_BITS[i + 1], TEST_BITS[i]);
    for (var j = 0; j < TEST_BITS.length; j += 2) {
      var vj = goog.math.Long.fromBits(TEST_BITS[j + 1], TEST_BITS[j]);
      var result = vi.subtract(vj);
      assertEquals(TEST_SUB_BITS[count++], result.getHighBits());
      assertEquals(TEST_SUB_BITS[count++], result.getLowBits());
    }
  }
}