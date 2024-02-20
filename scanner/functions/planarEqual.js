function planarEqual(actual, expected, delta) {
  return Array.isArray(actual)
      && actual.length === 2
      && inDelta(actual[0], expected[0], delta)
      && inDelta(actual[1], expected[1], delta);
}