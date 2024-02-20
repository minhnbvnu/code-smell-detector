async function tryTimes (promiseFn, maxTries = 10) {
  try {
    return await promiseFn()
  } catch (e) {
    if (maxTries > 0) {
      logger.warn('Failed, retry ' + maxTries)
      return tryTimes(promiseFn, maxTries - 1)
    }
    throw e
  }
}