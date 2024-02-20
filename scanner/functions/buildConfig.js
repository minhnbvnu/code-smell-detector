function buildConfig(definition, config, paths = [], objectKeys = 1) {
  let keysSeen = 0
  Object.entries(definition).reduce((conf, [key, value]) => {
    const type = typeof value
    keysSeen++
    if (type === 'string') {
      assignConfigValue({ config: conf, key, value, paths })
    } else if (type === 'object') {
      if (value.hasOwnProperty('default')) {
        assignConfigValue({ config: conf, key, value: value.default, paths })
      } else {
        // add the current leaf node key to the paths and recurse through function again
        const { length } = Object.keys(value)
        paths.push(key)
        buildConfig(definition[key], conf, paths, length)
      }
    }

    return conf
  }, config)

  // we have traversed every key in current object leaf node, remove wrapping key
  // to properly derive env vars of future leaf nodes
  if (keysSeen === objectKeys) {
    paths.pop()
  }
}