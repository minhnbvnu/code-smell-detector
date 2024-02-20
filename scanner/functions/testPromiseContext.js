function testPromiseContext(t, factory) {
    const agent = helper.loadTestAgent(t)
    const Promise = loadLibrary()

    _testPromiseContext(t, agent, factory.bind(null, Promise))
  }