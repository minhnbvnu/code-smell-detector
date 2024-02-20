function _isYearDateValid (str) {
  const regexp = /^[0-9]{4}$/
  if (!regexp.test(str)) return false
  return true
}