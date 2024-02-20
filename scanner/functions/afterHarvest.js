function afterHarvest(error) {
    _logErrorCallback(error, 'last harvest before shutdown')
    agent.stop(callback)
  }