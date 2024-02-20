function transformTimeString (timeString, formatTimeString) {
  return moment(timeString).format(formatTimeString)
}