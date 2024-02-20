function _validateThenUpdateStatusCodes(remote, local, remoteKey, localKey) {
  const valueToTest = remote[remoteKey]
  if (!Array.isArray(valueToTest)) {
    logger.warn(
      'Saw SSC (ignore|expect)_status_codes that is not an array, will not merge: %s',
      valueToTest
    )
    return
  }

  let valid = true
  valueToTest.forEach(function validateArray(thingToTest) {
    if (!('string' === typeof thingToTest || 'number' === typeof thingToTest)) {
      logger.warn(
        'Saw SSC (ignore|expect)_status_code that is not a number or string,' +
          'will not merge: %s',
        thingToTest
      )
      valid = false
    }
  })
  if (!valid) {
    return
  }

  return this._updateNestedIfChanged(remote, local, remoteKey, localKey)
}