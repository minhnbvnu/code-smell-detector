function testMetricCalls(name) {
    const testName = 'should create a metric for API#' + name
    t.test(testName, (t) => {
      const beforeMetric = agent.metrics.getOrCreateMetric(NAMES.SUPPORTABILITY.API + '/' + name)
      t.equal(beforeMetric.callCount, 0)

      // Some api calls required a name to be given rather than just an empty string
      api[name]('test')

      const afterMetric = agent.metrics.getOrCreateMetric(NAMES.SUPPORTABILITY.API + '/' + name)
      t.equal(afterMetric.callCount, 1)

      t.end()
    })
  }