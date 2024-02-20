function isJSONNotEmpty (str) {
  if (typeof str === 'string') {
    try {
      JSON.parse(str)
      if (str.indexOf('{') > -1) {
        return true
      } else {
        return false
      }
    } catch (e) {
      return false
    }
  }
  return false
}