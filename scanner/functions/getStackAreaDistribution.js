async function getStackAreaDistribution (projectId, startAt, endAt, countType, errorNameList = [], url = '') {
  const tableName = getTableName(projectId, startAt)
  let timeList = DatabaseUtil.getDatabaseTimeList(startAt, endAt, countType)
  let extendCondition = {}
  if (url.length > 0) {
    extendCondition['url_path'] = url
  }

  let rawRecordList = await Knex
    .sum('error_count as sum_error_count')
    .select(['error_name', 'count_at_time'])
    .from(tableName)
    .where('count_type', countType)
    .andWhere(extendCondition)
    .whereIn('count_at_time', timeList)
    .whereIn('error_name', errorNameList)
    .groupBy(['count_at_time', 'error_name'])
    .catch(err => {
      Logger.error(err.message)
      return []
    })
  let recordList = []
  for (let rawRecord of rawRecordList) {
    let { error_name: errorName, count_at_time: countAtTime, sum_error_count: sumErrorCount } = rawRecord
    let record = {
      error_name: errorName,
      count_at_time: countAtTime,
      error_count: sumErrorCount
    }
    recordList.push(record)
  }
  return recordList
}