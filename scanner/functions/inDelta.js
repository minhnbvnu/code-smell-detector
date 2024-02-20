function inDelta(actual, expected, delta) {
  return (Array.isArray(expected) ? inDeltaArray : inDeltaNumber)(actual, expected, delta);
}