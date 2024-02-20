function _handleResponseCode(response, endpoint, cb) {
  const code = response.status

  /* eslint-disable padded-blocks */
  if (SUCCESS.has(code)) {
    // The request was a success!
    setImmediate(cb, null, CollectorResponse.success(response.payload))
  } else if (RESTART.has(code)) {
    // The agent needs to disconnect and restart.
    logFailure(endpoint, code, 'Restarting')
    setImmediate(cb, null, CollectorResponse.reconnect(0, null))
  } else if (FAILURE_DISCARD_DATA.has(code)) {
    // Something was wrong with our payload so we must delete our data.
    logFailure(endpoint, code, 'Discarding harvest data')
    setImmediate(cb, null, CollectorResponse.discard(null))
  } else if (FAILURE_SAVE_DATA.has(code)) {
    // Something was wrong with the request, but it wasn't our fault. We'll try again.
    logFailure(endpoint, code, 'Retaining data for next harvest')
    setImmediate(cb, null, CollectorResponse.error(response.payload))
  } else if (code === 410) {
    // New Relic doesn't like us and we shouldn't try to talk to them any more.
    logFailure(endpoint, code, 'Disconnecting from New Relic')

    this._agent.stop(function onShutdown() {
      cb(null, CollectorResponse.fatal(response.payload))
    })
  } else {
    // We're not sure what New Relic is trying to tell us. Let's get rid of our
    // data just in case it is our fault.
    logger.error('Agent endpoint %s returned unexpected status %s.', endpoint, code)
    setImmediate(cb, null, CollectorResponse.discard(null))
  }
}