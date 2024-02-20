function makeSuite(name) {
  const agent = helper.loadMockedAgent()
  const suite = benchmark.createBenchmark({ name: name, delay: 0.01 })
  return { agent: agent, suite: suite }
}