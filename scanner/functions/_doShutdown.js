function _doShutdown(api, options, callback) {
  const agent = api.agent

  // If we need to wait for idle and there are currently active transactions,
  // listen for transactions ending and check if we're ready to go.
  if (options.waitForIdle && agent.activeTransactions) {
    options.waitForIdle = false // To prevent recursive waiting.
    agent.on('transactionFinished', function onTransactionFinished() {
      if (agent.activeTransactions === 0) {
        setImmediate(_doShutdown, api, options, callback)
      }
    })
    return
  }

  /**
   * Callback function for after harvest cycles happen as part of shutdown process
   *
   * @param {Error} error If defined, the error that occurred during harvest
   */
  function afterHarvest(error) {
    _logErrorCallback(error, 'last harvest before shutdown')
    agent.stop(callback)
  }

  if (options.collectPendingData && agent._state !== 'started') {
    if (typeof options.timeout === 'number') {
      setTimeout(function shutdownTimeout() {
        agent.stop(callback)
      }, options.timeout).unref()
    } else if (options.timeout) {
      logger.warn('options.timeout should be of type "number". Got %s', typeof options.timeout)
    }

    agent.on('started', function shutdownHarvest() {
      agent.forceHarvestAll(afterHarvest)
    })

    agent.on('errored', function logShutdownError(error) {
      _logErrorCallback(error, 'after shutdown')
      agent.stop(callback)
    })
  } else if (options.collectPendingData) {
    agent.forceHarvestAll(afterHarvest)
  } else {
    agent.stop(callback)
  }
}