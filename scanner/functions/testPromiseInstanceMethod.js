function testPromiseInstanceMethod(t, plan, testFunc) {
    const agent = helper.loadTestAgent(t)
    const Promise = loadLibrary()

    _testPromiseMethod(t, plan, agent, function (name) {
      const p = Promise.resolve([1, 2, 3, name])
      return testFunc(Promise, p, name, agent)
    })
  }