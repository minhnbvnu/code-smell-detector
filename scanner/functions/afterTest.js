function afterTest() {
    helper.unloadAgent(agent)
    agent = null
    shim = null
    TestPromise = null
  }