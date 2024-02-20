function assertMetricValues(transaction, expected, exact) {
  const metrics = transaction.metrics

  for (let i = 0; i < expected.length; ++i) {
    let expectedMetric = Object.assign({}, expected[i])
    let name = null
    let scope = null

    if (typeof expectedMetric === 'string') {
      name = expectedMetric
      expectedMetric = {}
    } else {
      name = expectedMetric[0].name
      scope = expectedMetric[0].scope
    }

    const metric = metrics.getMetric(name, scope)
    this.ok(metric, 'should have expected metric name')

    this.strictSame(metric.toJSON(), expectedMetric[1], 'metric values should match')
  }

  if (exact) {
    const metricsJSON = metrics.toJSON()
    this.equal(metricsJSON.length, expected.length, 'metrics length should match')
  }
}