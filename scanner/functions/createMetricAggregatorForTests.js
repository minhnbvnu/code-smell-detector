function createMetricAggregatorForTests() {
  const mapper = new MetricMapper()
  const normalizer = new MetricNormalizer({}, 'metric name')

  return new MetricAggregator(
    {
      apdexT: 0.5,
      mapper: mapper,
      normalizer: normalizer
    },
    {},
    { add() {} }
  )
}