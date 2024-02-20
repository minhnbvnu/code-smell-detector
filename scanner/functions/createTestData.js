function createTestData(agent, callback) {
  const metric = agent.metrics.getOrCreateMetric('myMetric')
  metric.incrementCallCount()

  agent.errors.addUserError(null, new Error('Why?!!!?!!'))

  agent.customEventAggregator.add([{ type: 'MyCustomEvent', timestamp: Date.now() }])

  helper.runInTransaction(agent, (transaction) => {
    const segment = transaction.trace.add('MySegment')
    segment.overwriteDurationInMillis(1)
    agent.queries.add(segment, 'mysql', 'select * from foo', new Error().stack)

    transaction.finalizeNameFromUri('/some/test/url', 200)
    transaction.end()
    callback()
  })
}