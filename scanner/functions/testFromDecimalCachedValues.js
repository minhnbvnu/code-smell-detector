function testFromDecimalCachedValues() {
  try {
    var handledException;
    goog.asserts.setErrorHandler(function(e) { handledException = e; });

    assertEquals(goog.math.Long.getZero(), goog.math.Long.fromInt(0.1));
    assertTrue(handledException != null);

    handledException = null;
    assertEquals(goog.math.Long.getZero(), goog.math.Long.fromInt(0.2));
    assertTrue(handledException != null);

    handledException = null;
    assertEquals(goog.math.Long.getOne(), goog.math.Long.fromInt(1.1));
    assertTrue(handledException != null);
  } finally {
    goog.asserts.setErrorHandler(goog.asserts.DEFAULT_ERROR_HANDLER);
  }
}