function verifySample(t, sample, count, segment) {
  t.equal(sample.callCount, count, 'should have correct callCount')
  t.ok(sample.max, 'max should be set')
  t.ok(sample.min, 'min should be set')
  t.ok(sample.sumOfSquares, 'sumOfSquares should be set')
  t.ok(sample.total, 'total should be set')
  t.ok(sample.totalExclusive, 'totalExclusive should be set')
  t.ok(sample.trace, 'trace should be set')
  verifyTrace(t, sample.trace, segment)
}