function assertEquals(actual, expected, message) {
  assert(
    actual === expected,
    message || `Expected ${expected} but got ${actual}`
  );
}