function assertApproximatelyEqual(first, second, message) {
    var delta = Math.abs(first - second)
    assert.ok(delta < EPSILON, message)
  }