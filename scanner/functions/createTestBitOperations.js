function createTestBitOperations(i) {
  return function() {
    var vi = goog.math.Long.fromBits(TEST_BITS[i + 1], TEST_BITS[i]);
    assertEquals(~TEST_BITS[i], vi.not().getHighBits());
    assertEquals(~TEST_BITS[i + 1], vi.not().getLowBits());

    for (var j = 0; j < TEST_BITS.length; j += 2) {
      var vj = goog.math.Long.fromBits(TEST_BITS[j + 1], TEST_BITS[j]);
      assertEquals(TEST_BITS[i] & TEST_BITS[j], vi.and(vj).getHighBits());
      assertEquals(
          TEST_BITS[i + 1] & TEST_BITS[j + 1], vi.and(vj).getLowBits());
      assertEquals(TEST_BITS[i] | TEST_BITS[j], vi.or(vj).getHighBits());
      assertEquals(TEST_BITS[i + 1] | TEST_BITS[j + 1], vi.or(vj).getLowBits());
      assertEquals(TEST_BITS[i] ^ TEST_BITS[j], vi.xor(vj).getHighBits());
      assertEquals(
          TEST_BITS[i + 1] ^ TEST_BITS[j + 1], vi.xor(vj).getLowBits());
    }

    assertEquals(TEST_BITS[i], vi.shiftLeft(0).getHighBits());
    assertEquals(TEST_BITS[i + 1], vi.shiftLeft(0).getLowBits());
    assertEquals(TEST_BITS[i], vi.shiftRight(0).getHighBits());
    assertEquals(TEST_BITS[i + 1], vi.shiftRight(0).getLowBits());
    assertEquals(TEST_BITS[i], vi.shiftRightUnsigned(0).getHighBits());
    assertEquals(TEST_BITS[i + 1], vi.shiftRightUnsigned(0).getLowBits());

    for (var len = 1; len < 64; ++len) {
      if (len < 32) {
        assertEquals(
            (TEST_BITS[i] << len) | (TEST_BITS[i + 1] >>> (32 - len)),
            vi.shiftLeft(len).getHighBits());
        assertEquals(TEST_BITS[i + 1] << len, vi.shiftLeft(len).getLowBits());

        assertEquals(TEST_BITS[i] >> len, vi.shiftRight(len).getHighBits());
        assertEquals(
            (TEST_BITS[i + 1] >>> len) | (TEST_BITS[i] << (32 - len)),
            vi.shiftRight(len).getLowBits());

        assertEquals(
            TEST_BITS[i] >>> len, vi.shiftRightUnsigned(len).getHighBits());
        assertEquals(
            (TEST_BITS[i + 1] >>> len) | (TEST_BITS[i] << (32 - len)),
            vi.shiftRightUnsigned(len).getLowBits());
      } else {
        assertEquals(
            TEST_BITS[i + 1] << (len - 32), vi.shiftLeft(len).getHighBits());
        assertEquals(0, vi.shiftLeft(len).getLowBits());

        assertEquals(
            TEST_BITS[i] >= 0 ? 0 : -1, vi.shiftRight(len).getHighBits());
        assertEquals(
            TEST_BITS[i] >> (len - 32), vi.shiftRight(len).getLowBits());

        assertEquals(0, vi.shiftRightUnsigned(len).getHighBits());
        if (len == 32) {
          assertEquals(TEST_BITS[i], vi.shiftRightUnsigned(len).getLowBits());
        } else {
          assertEquals(
              TEST_BITS[i] >>> (len - 32),
              vi.shiftRightUnsigned(len).getLowBits());
        }
      }
    }

    assertEquals(TEST_BITS[i], vi.shiftLeft(64).getHighBits());
    assertEquals(TEST_BITS[i + 1], vi.shiftLeft(64).getLowBits());
    assertEquals(TEST_BITS[i], vi.shiftRight(64).getHighBits());
    assertEquals(TEST_BITS[i + 1], vi.shiftRight(64).getLowBits());
    assertEquals(TEST_BITS[i], vi.shiftRightUnsigned(64).getHighBits());
    assertEquals(TEST_BITS[i + 1], vi.shiftRightUnsigned(64).getLowBits());
  };
}