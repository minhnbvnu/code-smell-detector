function assertInDelta(actual, expected, delta = 1e-6) {
  assert(inDelta(actual, expected, delta), `${actual} should be within ${delta} of ${expected}`);
}