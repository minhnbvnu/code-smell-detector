async function getErrorNameList (projectId, errorType) {
  const nowMoment = moment().endOf('YYYY-MM-DD')
  const sevenDaysAgoMoment = nowMoment.clone().subtract(3, DATE_FORMAT.UNIT.DAY).startOf('YYYY-MM-DD')
  const tableName = getTableName(projectId, nowMoment.unix())

  let timeList = []
  for (let timeAt = sevenDaysAgoMoment.unix(); timeAt < nowMoment.unix(); timeAt += 86400) {
    const time = moment.unix(timeAt).format(DATE_FORMAT.DATABASE_BY_DAY)
    timeList.push(time)
  }
  const rawRecordList = await Knex
    .select()
    .distinct('error_name')
    .from(tableName)
    .where('count_type', DATE_FORMAT.UNIT.DAY)
    .where('error_type', errorType)
    .whereIn('count_at_time', timeList)
    .catch(err => {
      Logger.error(err.message)
      return []
    })
  const errorNameList = []
  for (let rawRecord of rawRecordList) {
    errorNameList.push(rawRecord['error_name'])
  }
  return errorNameList
}