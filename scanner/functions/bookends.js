function bookends(t) {
    t.beforeEach(() => {
      agent = helper.loadMockedAgent()
      txn = new Transaction(agent)
    })

    t.afterEach(() => {
      helper.unloadAgent(agent)
    })
  }