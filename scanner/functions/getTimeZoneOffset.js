function getTimeZoneOffset(timeZone, originalDate) {
  var timeZoneOffset = timeZone
    ? tzParseTimezone(timeZone, originalDate, true) / MILLISECONDS_IN_MINUTE
    : originalDate.getTimezoneOffset()
  if (Number.isNaN(timeZoneOffset)) {
    throw new RangeError('Invalid time zone specified: ' + timeZone)
  }
  return timeZoneOffset
}