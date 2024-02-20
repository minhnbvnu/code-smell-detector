function setLambdaHandler(callback) {
  logger.debug('Not calling setLambdaHandler because New Relic is disabled.')
  return callback
}