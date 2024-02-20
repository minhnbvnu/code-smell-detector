function checkQueries(t, agent) {
  const querySamples = agent.queries.samples
  t.ok(querySamples.size > 0, 'there should be a query sample')
  for (const sample of querySamples.values()) {
    t.ok(sample.total > 0, 'the samples should have positive duration')
  }
}