function onShutdown(error, response) {
    if (error) {
      dumpErrors([error], 'shutdown')
    }

    agent.setState('disconnected')
    logger.info('Disconnected from New Relic; clearing run ID %s.', agent.config.run_id)
    agent.config.run_id = undefined

    callback(error, CollectorResponse.fatal(response && response.payload))
  }