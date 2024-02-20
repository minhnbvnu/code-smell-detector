function validateDayOfYearDate(year, dayOfYear) {
  if (dayOfYear < 1) {
    return false
  }

  var isLeapYear = isLeapYearIndex(year)
  if (isLeapYear && dayOfYear > 366) {
    return false
  }
  if (!isLeapYear && dayOfYear > 365) {
    return false
  }

  return true
}