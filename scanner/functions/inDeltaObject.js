function inDeltaObject(actual, expected, delta) {
  for (let i in expected) if (!inDelta(actual[i], expected[i], delta)) return false;
  for (let i in actual) if (!(i in expected)) return false;
  return true;
}