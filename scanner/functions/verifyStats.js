function verifyStats(actualStats, expectedStats) {
  this.equal(actualStats.callCount, expectedStats.callCount)
  this.equal(actualStats.total, expectedStats.totalTime)
  this.equal(actualStats.totalExclusive, expectedStats.totalExclusive)
  this.equal(actualStats.min, expectedStats.min)
  this.equal(actualStats.max, expectedStats.max)
  this.equal(actualStats.sumOfSquares, expectedStats.sumOfSquares)
}