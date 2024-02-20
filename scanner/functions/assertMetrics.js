function assertMetrics(metrics, expected, exclusive, assertValues) {
  // Assertions about arguments because maybe something returned undefined
  // unexpectedly and is passed in, or a return type changed. This will
  // hopefully help catch that and make it obvious.
  this.ok(isSimpleObject(metrics), 'first argument required to be an Metrics object')
  this.ok(Array.isArray(expected), 'second argument required to be an array of metrics')
  this.ok(typeof exclusive === 'boolean', 'third argument required to be a boolean if provided')

  if (assertValues === undefined) {
    assertValues = true
  }

  for (let i = 0, len = expected.length; i < len; i++) {
    const expectedMetric = expected[i]
    const metric = metrics.getMetric(expectedMetric[0].name, expectedMetric[0].scope)
    this.ok(metric)
    if (assertValues) {
      this.same(metric.toJSON(), expectedMetric[1])
    }
  }

  if (exclusive) {
    const metricsList = metrics.toJSON()
    this.equal(metricsList.length, expected.length)
  }
}