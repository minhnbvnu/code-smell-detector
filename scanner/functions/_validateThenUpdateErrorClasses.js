function _validateThenUpdateErrorClasses(remote, local, remoteKey, localKey) {
  const valueToTest = remote[remoteKey]
  if (!Array.isArray(valueToTest)) {
    logger.warn(
      'Saw SSC (ignore|expect)_classes that is not an array, will not merge: %s',
      valueToTest
    )
    return
  }

  let valid = true
  Object.keys(valueToTest).forEach(function validateArray(key) {
    const thingToTest = valueToTest[key]
    if ('string' !== typeof thingToTest) {
      logger.warn(
        'Saw SSC (ignore|expect)_class that is not a string, will not merge: %s',
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