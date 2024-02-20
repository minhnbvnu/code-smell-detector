function testPromiseClassMethod(t, plan, testFunc) {
    const agent = helper.loadTestAgent(t)
    const Promise = loadLibrary()

    _testPromiseMethod(t, plan, agent, function (name) {
      return testFunc(Promise, name)
    })
  }