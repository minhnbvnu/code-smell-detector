function zonedTimeToUtc(date, timeZone, options) {
  if (typeof date === 'string' && !date.match(tzPattern)) {
    var extendedOptions = cloneObject(options)
    extendedOptions.timeZone = timeZone
    return toDate(date, extendedOptions)
  }

  var d = toDate(date, options)

  var utc = newDateUTC(
    d.getFullYear(),
    d.getMonth(),
    d.getDate(),
    d.getHours(),
    d.getMinutes(),
    d.getSeconds(),
    d.getMilliseconds()
  ).getTime()

  var offsetMilliseconds = tzParseTimezone(timeZone, new Date(utc))

  return new Date(utc + offsetMilliseconds)
}