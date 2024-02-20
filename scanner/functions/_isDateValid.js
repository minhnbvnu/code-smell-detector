function _isDateValid (str) {
  const regexp = /^[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/
  if (!regexp.test(str)) return false
  return true
}