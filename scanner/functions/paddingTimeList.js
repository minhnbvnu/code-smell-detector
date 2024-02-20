function paddingTimeList (rawRecordList, startAt, endAt, countType, defaultRecord = {}) {
  let resultList = []
  let startMoment = moment.unix(startAt).startOf(countType)
  let endMoment = moment.unix(endAt).endOf(countType)
  let timeStep
  let recordMap = {}
  switch (countType) {
    case DATE_FORMAT.UNIT.MINUTE:
      timeStep = 60
      break
    case DATE_FORMAT.UNIT.HOUR:
      timeStep = 3600
      break
    case DATE_FORMAT.UNIT.DAY:
      timeStep = 86400
      break
    default:
      return []
  }
  for (let rawRecord of rawRecordList) {
    let indexAt = _.get(rawRecord, ['index'], 0)
    recordMap[indexAt] = rawRecord
  }
  for (let timeAt = startMoment.unix(); timeAt <= endMoment.unix(); timeAt += timeStep) {
    let placeholderRecord = { ...defaultRecord, 'index': timeAt }
    let record = _.get(recordMap, [timeAt], placeholderRecord)
    resultList.push(record)
  }
  return resultList
}