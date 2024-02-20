function stringifyKeys(shim, keys) {
  let key = null
  if (keys && keys.length && !shim.isFunction(keys)) {
    try {
      key = stringify(keys[0])
    } catch (err) {
      shim.logger.debug(err, 'Failed to stringify redis key for send command')
      key = '<unknown>'
    }
  }

  return key
}