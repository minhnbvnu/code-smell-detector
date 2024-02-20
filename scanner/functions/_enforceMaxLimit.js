function _enforceMaxLimit(currentLimit, maxLimit) {
  let spanLimit = currentLimit
  if (spanLimit > maxLimit) {
    spanLimit = maxLimit

    logger.debug('Using maximum allowed span event limit of %s', maxLimit)
  }

  return spanLimit
}