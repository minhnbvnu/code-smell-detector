async function getErrorNameDistributionListInSameMonth (projectId, startAt, endAt, countType, errorNameList = [], url = {}) {
  const tableName = getTableName(projectId, startAt)
  let countAtTimeList = DatabaseUtil.getDatabaseTimeList(startAt, endAt, countType)
  let extendCondition = {}
  if (url.length > 0) {
    extendCondition['url_path'] = url
  }
  let rawRecordList = await Knex
    .select('error_name')
    .sum('error_count as sum_error_count')
    .from(tableName)
    .where('count_type', countType)
    .whereIn('count_at_time', countAtTimeList)
    .whereIn('error_name', errorNameList)
    .andWhere(extendCondition)
    .groupBy('error_name')
    .orderBy('sum_error_count', 'desc')
    .catch(err => {
      Logger.error(err.message)
      return []
    })

  let recordList = []
  for (let rawRecord of rawRecordList) {
    let { sum_error_count: errorCount, error_name: errorName } = rawRecord
    let record = {
      error_count: errorCount,
      error_name: errorName
    }
    recordList.push(record)
  }

  return recordList
}