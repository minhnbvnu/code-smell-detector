function getDatabaseTimeList (startAt, endAt, type) {
  let countAtTimeList = []
  let startMoment
  let endMoment
  let dateBaseFormat
  let timeStep = 3600
  switch (type) {
    case DATE_FORMAT.UNIT.MINUTE:
      dateBaseFormat = DATE_FORMAT.DATABASE_BY_MINUTE
      timeStep = 60
      break
    case DATE_FORMAT.UNIT.HOUR:
      dateBaseFormat = DATE_FORMAT.DATABASE_BY_HOUR
      timeStep = 3600
      break
    case DATE_FORMAT.UNIT.DAY:
      dateBaseFormat = DATE_FORMAT.DATABASE_BY_DAY
      timeStep = 86400
      break
    default:
      return []
  }
  startMoment = moment.unix(startAt).startOf(type)
  endMoment = moment.unix(endAt).endOf(type)
  for (let timeAt = startMoment.unix(); timeAt <= endMoment.unix(); timeAt += timeStep) {
    let time = moment.unix(timeAt).format(dateBaseFormat)
    countAtTimeList.push(time)
  }
  return countAtTimeList
}