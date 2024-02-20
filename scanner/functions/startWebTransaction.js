function startWebTransaction(url, callback) {
  logger.debug('Not calling startWebTransaction because New Relic is disabled.')
  if (typeof callback === 'function') {
    return callback()
  }

  return null
}