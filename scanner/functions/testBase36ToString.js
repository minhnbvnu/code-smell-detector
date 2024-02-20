function testBase36ToString() {
  assertEquals('zzzzzz', goog.math.Long.fromString('zzzzzz', 36).toString(36));
}