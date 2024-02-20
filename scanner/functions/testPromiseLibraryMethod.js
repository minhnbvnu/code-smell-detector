function testPromiseLibraryMethod(t, plan, testFunc) {
  const agent = setupAgent(t)
  const when = require('when')

  _testPromiseMethod(t, plan, agent, function (name) {
    return testFunc(when, name)
  })
}