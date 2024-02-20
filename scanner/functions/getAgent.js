function getAgent(t) {
  const agent = helper.loadMockedAgent()

  t.teardown(function () {
    helper.unloadAgent(agent)
  })

  return agent
}