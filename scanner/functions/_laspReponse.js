function _laspReponse(keys) {
  if (keys.length) {
    logger.error('The agent received one or more unexpected security policies and will shut down.')
    return CollectorResponse.fatal(null)
  }
  return CollectorResponse.success(null)
}