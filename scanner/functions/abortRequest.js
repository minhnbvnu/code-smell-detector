function abortRequest() {
    logger.debug('Aborting request for metadata at %j', opts)
    req.abort()
    agent.removeListener('errored', abortRequest)
    agent.removeListener('stopped', abortRequest)
    agent.removeListener('disconnected', abortRequest)
  }