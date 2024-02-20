function beforeTest() {
    TestPromise = require('./promise-shim')()

    agent = helper.loadMockedAgent()
    shim = new PromiseShim(agent, 'test-promise', null)
  }