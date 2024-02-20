function getQueueTime(logger, requestHeaders) {
  const headerValue = requestHeaders[REQUEST_START_HEADER] || requestHeaders[QUEUE_HEADER]
  if (!headerValue) {
    return null
  }

  const split = headerValue.split('=')
  const rawQueueTime = split.length > 1 ? split[1] : headerValue

  const parsedQueueTime = parseFloat(rawQueueTime)
  if (isNaN(parsedQueueTime)) {
    logger.warn('Queue time header parsed as NaN. See trace level log for value.')

    // This header can hold up to 4096 bytes which could quickly fill up logs.
    // Do not log a level higher than debug.
    logger.trace('Queue time: %s', rawQueueTime)

    return null
  }

  return convertUnit(parsedQueueTime)
}