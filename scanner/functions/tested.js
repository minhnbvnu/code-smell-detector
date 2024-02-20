function tested(error, command) {
    t.error(error)
    t.equal(command.shouldShutdownRun(), true)

    t.notOk(agent.config.run_id)

    failure.done()
    shutdownEndpoint.done()

    t.end()
  }