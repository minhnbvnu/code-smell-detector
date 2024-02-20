function startSegment(name, record, handler, callback) {
  logger.debug('Not calling `startSegment` because New Relic is disabled.')
  if (typeof handler === 'function') {
    return handler(callback)
  }
  return null
}