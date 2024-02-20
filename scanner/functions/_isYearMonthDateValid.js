function _isYearMonthDateValid (str) {
  const regexp = /^[0-9]{4}-(0[1-9]|1[0-2])$/
  if (!regexp.test(str)) return false
  return true
}