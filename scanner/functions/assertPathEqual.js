function assertPathEqual(actual, expected) {
  assert.strictEqual(normalizePath(actual + ""), normalizePath(expected + ""));
}