function createTestComparisons(i) {
  return function() {
    var vi = goog.math.Long.fromBits(TEST_BITS[i + 1], TEST_BITS[i]);
    for (var j = 0; j < TEST_BITS.length; j += 2) {
      var vj = goog.math.Long.fromBits(TEST_BITS[j + 1], TEST_BITS[j]);
      assertEquals(i == j, vi.equals(vj));
      assertEquals(i != j, vi.notEquals(vj));
      assertEquals(i < j, vi.lessThan(vj));
      assertEquals(i <= j, vi.lessThanOrEqual(vj));
      assertEquals(i > j, vi.greaterThan(vj));
      assertEquals(i >= j, vi.greaterThanOrEqual(vj));
    }
  };
}