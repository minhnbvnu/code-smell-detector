function tzParseTimezone(timezoneString, date, isUtcDate) {
  var token
  var absoluteOffset

  // Empty string
  if (!timezoneString) {
    return 0
  }

  // Z
  token = patterns.timezoneZ.exec(timezoneString)
  if (token) {
    return 0
  }

  var hours

  // ±hh
  token = patterns.timezoneHH.exec(timezoneString)
  if (token) {
    hours = parseInt(token[1], 10)

    if (!validateTimezone(hours)) {
      return NaN
    }

    return -(hours * MILLISECONDS_IN_HOUR)
  }

  // ±hh:mm or ±hhmm
  token = patterns.timezoneHHMM.exec(timezoneString)
  if (token) {
    hours = parseInt(token[1], 10)
    var minutes = parseInt(token[2], 10)

    if (!validateTimezone(hours, minutes)) {
      return NaN
    }

    absoluteOffset = Math.abs(hours) * MILLISECONDS_IN_HOUR + minutes * MILLISECONDS_IN_MINUTE
    return hours > 0 ? -absoluteOffset : absoluteOffset
  }

  // IANA time zone
  if (isValidTimezoneIANAString(timezoneString)) {
    date = new Date(date || Date.now())
    var utcDate = isUtcDate ? date : toUtcDate(date)

    var offset = calcOffset(utcDate, timezoneString)

    var fixedOffset = isUtcDate ? offset : fixOffset(date, offset, timezoneString)

    return -fixedOffset
  }

  return NaN
}