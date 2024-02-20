async function getSQL () {
  let sql = ''
  let sqlList = []
  sqlList[0] = getAlarmLog()
  sqlList[1] = getUserSQL()
  sqlList[2] = getBehaviorDistribution()
  sqlList[3] = getErrorSummarySQL()
  sqlList[4] = getOriginMonitorSQL()
  sqlList[5] = getIndicatorSQl()
  sqlList[6] = getOSDistribution()
  sqlList[7] = getBrowserDistribution()
  sqlList[8] = getDuration()
  sqlList[9] = getNewUser()
  for (let sql of sqlList) {
    await Knex.schema.raw(sql)
  }
  sql = sqlList.join('')
  return sql
}