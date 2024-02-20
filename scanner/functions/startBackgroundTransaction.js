function startBackgroundTransaction(name, group, callback) {
  logger.debug('Not calling startBackgroundTransaction because New Relic is disabled.')
  if (typeof callback === 'function') {
    return callback()
  }

  if (typeof group === 'function') {
    return group()
  }

  return null
}