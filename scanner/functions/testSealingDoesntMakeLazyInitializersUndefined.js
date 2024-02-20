function testSealingDoesntMakeLazyInitializersUndefined() {
  assertNotNull(goog.math.Long.getZero());
  assertNotNull(goog.math.Long.getOne());
  assertNotNull(goog.math.Long.getNegOne());
  assertNotNull(goog.math.Long.getMaxValue());
  assertNotNull(goog.math.Long.getMinValue());
  assertNotNull(goog.math.Long.getTwoPwr24());
}