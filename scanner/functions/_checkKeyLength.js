function _checkKeyLength(object, maxLength) {
  const keys = Object.keys(object)
  let badKey = false
  const len = keys.length
  let key = '' // init to string because gotta go fast
  for (let i = 0; i < len; i++) {
    key = keys[i]
    if (key.length > maxLength) {
      logger.warn(
        'recordCustomEvent requires keys to be less than 256 chars got %s (%s)',
        key,
        key.length
      )
      badKey = true
    }
  }
  return badKey
}