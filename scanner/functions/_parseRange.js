function _parseRange(range, parsed) {
  const split = range.split('-')
  if (split.length !== 2) {
    logger.warn('Failed to parse range %s', range)
    return parsed
  }
  if (split[0] === '') {
    // catch negative code. ex. -7
    return parsed.push(parseInt(range, 10))
  }
  const lower = parseInt(split[0], 10)
  const upper = parseInt(split[1], 10)
  if (Number.isNaN(lower) || Number.isNaN(upper)) {
    logger.warn('Range must contain two numbers %s', range)
    return parsed
  }
  if (lower > upper) {
    logger.warn('Range must start with lower bound %s', range)
  } else if (lower < 0 || upper > 1000) {
    logger.warn('Range must be between 0 and 1000 %s', range)
  } else {
    // success
    for (let i = lower; i <= upper; i++) {
      parsed.push(i)
    }
  }
  return parsed
}