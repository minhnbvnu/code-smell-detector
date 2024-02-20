function assignConfigValue({ config, key, value, paths }) {
  if (paths.length) {
    setNestedKey(config, [...paths, key], value)
  } else {
    config[key] = value
  }
}