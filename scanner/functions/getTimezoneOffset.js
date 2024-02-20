function getTimezoneOffset(timeZone, date) {
  return -tzParseTimezone(timeZone, date)
}