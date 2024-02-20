function verifyAgentBehavior(t, testCase, agent, error) {
  if (testCase.should_shutdown) {
    t.ok(error)
    const shutdownStates = ['stopped', 'disconnected', 'disconnecting', 'stopping', 'errored']
    const isShutdownState = shutdownStates.indexOf(agent._state) >= 0
    t.ok(isShutdownState)
  } else {
    t.error(error)
    t.equal(agent._state, 'started')
  }
}