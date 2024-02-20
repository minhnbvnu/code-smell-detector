function getRequired (key) {
  const value = deployerConfig[key]
  if (value) return value
  exports.missing.push(key)
}