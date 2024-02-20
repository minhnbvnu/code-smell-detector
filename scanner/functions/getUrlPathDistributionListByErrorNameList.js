async function getUrlPathDistributionListByErrorNameList (projectId, startAt, endAt, errorNameList, countType, max = 10) {
  const tableName = getTableName(projectId, startAt)
  let countAtTimeList = DatabaseUtil.getDatabaseTimeList(startAt, endAt, countType)
  let rawRecordList = await Knex
    .select('url_path')
    .sum('error_count as total_count')
    .from(tableName)
    .where('count_type', countType)
    .whereIn('error_name', errorNameList)
    .whereIn('count_at_time', countAtTimeList)
    .groupBy('url_path')
    .orderBy('total_count', 'desc')
    .limit(max)
    .catch(err => {
      Logger.error(err.message)
      return []
    })
  let recordList = []
  for (let rawRecord of rawRecordList) {
    let urlPath = _.get(rawRecord, ['url_path'], '')
    let errorCount = _.get(rawRecord, ['total_count'], 0)
    let record = {
      url_path: urlPath,
      error_count: errorCount
    }
    recordList.push(record)
  }
  return recordList
}