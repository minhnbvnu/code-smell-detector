function _validateThenUpdateErrorMessages(remote, local, remoteKey, localKey) {
  const valueToTest = remote[remoteKey]
  if (Array.isArray(valueToTest)) {
    logger.warn('Saw SSC (ignore|expect)_message that is an Array, will not merge: %s', valueToTest)
    return
  }

  if (!valueToTest) {
    logger.warn('SSC ignore|expect_message is null or undefined, will not merge')
    return
  }

  if ('object' !== typeof valueToTest) {
    logger.warn(
      'Saw SSC (ignore|expect)_message that is primitive/scaler, will not merge: %s',
      valueToTest
    )
    return
  }

  let valid = true
  Object.keys(valueToTest).forEach(function validateArray(key) {
    const arrayToTest = valueToTest[key]
    if (!Array.isArray(arrayToTest)) {
      logger.warn('Saw SSC message array that is not an array, will not merge: %s', arrayToTest)
      valid = false
    }
  })
  if (!valid) {
    return
  }

  return this._updateNestedIfChanged(remote, local, remoteKey, localKey)
}