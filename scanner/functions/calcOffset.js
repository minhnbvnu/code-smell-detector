function calcOffset(date, timezoneString) {
  var tokens = tzTokenizeDate(date, timezoneString)

  // ms dropped because it's not provided by tzTokenizeDate
  var asUTC = newDateUTC(
    tokens[0],
    tokens[1] - 1,
    tokens[2],
    tokens[3] % 24,
    tokens[4],
    tokens[5],
    0
  ).getTime()

  var asTS = date.getTime()
  var over = asTS % 1000
  asTS -= over >= 0 ? over : 1000 + over
  return asUTC - asTS
}