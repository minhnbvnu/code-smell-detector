function formatInTimeZone(date, timeZone, formatStr, options) {
  var extendedOptions = cloneObject(options)
  extendedOptions.timeZone = timeZone
  return format(utcToZonedTime(date, timeZone), formatStr, extendedOptions)
}