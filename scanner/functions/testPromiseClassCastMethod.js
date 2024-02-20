function testPromiseClassCastMethod(t, plan, testFunc) {
    const agent = helper.loadTestAgent(t)
    const Promise = loadLibrary()

    _testAllCastTypes(t, plan, agent, function (t, name, value) {
      return testFunc(t, Promise, name, value)
    })
  }