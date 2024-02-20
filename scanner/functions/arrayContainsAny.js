function arrayContainsAny(array) {
  for (let i = 1; i < arguments.length; ++i) {
    if (array.indexOf(arguments[i]) !== -1) {
      return true
    }
  }

  return false
}