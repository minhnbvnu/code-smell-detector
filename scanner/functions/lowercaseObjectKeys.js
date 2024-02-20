function lowercaseObjectKeys(original) {
  return Object.keys(original).reduce((destination, key) => {
    destination[key.toLowerCase()] = original[key]
    return destination
  }, {})
}